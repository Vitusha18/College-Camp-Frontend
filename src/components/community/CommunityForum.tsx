import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../types';
import {
  Users2,
  Plus,
  ThumbsUp,
  MessageSquare,
  Share2,
  Pin,
  TrendingUp,
  Award,
  Send,
  X,
  Search,
  Sparkles,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Coding',
  'Placements',
  'Higher Studies',
  'Internships',
  'Scholarships',
] as const;

export const CommunityForum: React.FC = () => {
  const {
    communityPosts,
    createPost,
    togglePostUpvote,
    addPostComment,
    userProfile,
    addToast,
    searchQuery,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [commentInputMap, setCommentInputMap] = useState<Record<string, string>>({});

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('Coding');
  const [newTagInput, setNewTagInput] = useState('');

  const handleShare = async (postId: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/forum/post/${postId}`);
      addToast({ type: 'success', title: 'Link Copied', message: 'Post link copied to clipboard.' });
    } catch {
      addToast({ type: 'error', title: 'Unable to copy link', message: 'Check clipboard permissions and try again.' });
    }
  };

  const filteredPosts = useMemo(() => {
    const query = (search || searchQuery).trim().toLowerCase();
    return communityPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        query === '' ||
        post.content.toLowerCase().includes(query) ||
        (post.title && post.title.toLowerCase().includes(query)) ||
        post.authorName.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [communityPosts, selectedCategory, search, searchQuery]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const tags = newTagInput
      ? newTagInput.split(',').map((t) => (t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`))
      : [`#${newCategory.toLowerCase().replace(/\s+/g, '')}`];

    try {
      await createPost({
        authorName: userProfile.name,
        authorRole: 'Student',
        authorAvatar: userProfile.avatar,
        authorBranch: userProfile.year || '3rd Year CSE',
        category: newCategory,
        title: newTitle.trim() || undefined,
        content: newContent.trim(),
        tags,
      });
    } catch {
      return;
    }

    setNewTitle('');
    setNewContent('');
    setNewTagInput('');
    setIsCreateModalOpen(false);
  };

  const handleCommentSubmit = async (postId: string) => {
    const text = commentInputMap[postId];
    if (!text || !text.trim()) return;

    try {
      await addPostComment(postId, text.trim());
    } catch {
      return;
    }
    setCommentInputMap((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Campus Community & Networking</h2>
          <p className="text-xs text-slate-500">
            Share placement resources, discuss interview experiences, and collaborate with peer developers.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Post
        </button>
      </div>

      {/* Category Tabs matching UI screenshot */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Feed Container (Single Column Layout) */}
      <div className="max-w-4xl mx-auto w-full space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
            <Users2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">No discussions in this category yet</p>
            <p className="text-xs text-slate-400 mt-1">Be the first to start a conversation!</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsOpen = expandedCommentsPostId === post.id;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-3"
              >
                {/* Author Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{post.authorName}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                          {post.authorBranch}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {new Date(post.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} • in <span className="font-semibold text-indigo-600">{post.category}</span>
                      </p>
                    </div>
                  </div>

                  {post.isPinned && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                      <Pin className="w-3 h-3" /> Pinned
                    </span>
                  )}
                </div>

                {/* Post Title & Content */}
                {post.title && (
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h3>
                )}

                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Bar matching UI screenshot */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePostUpvote(post.id)}
                      aria-label={post.hasUpvoted ? 'Remove upvote' : 'Upvote'}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${post.hasUpvoted
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${post.hasUpvoted ? 'fill-indigo-600' : ''}`} />
                      <span>{post.upvotes}</span>
                    </button>

                    <button
                      onClick={() =>
                        setExpandedCommentsPostId(isCommentsOpen ? null : post.id)
                      }
                      aria-label={isCommentsOpen ? 'Hide comments' : 'Show comments'}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.commentsCount || 0}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleShare(post.id)}
                    aria-label="Copy post link"
                    title="Copy link to clipboard"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Expandable Comments Drawer */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 bg-slate-50/50 p-3 rounded-xl">
                    <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Discussion ({post.comments?.length || 0})
                    </h5>

                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-2.5">
                        {post.comments.map((c) => (
                          <div key={c.id} className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-bold text-slate-900">{c.authorName} ({c.authorBranch})</span>
                              <span className="text-slate-400">{c.createdAt}</span>
                            </div>
                            <p className="text-xs text-slate-600">{c.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add comment input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={commentInputMap[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputMap((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCommentSubmit(post.id);
                        }}
                        placeholder="Write a helpful response..."
                        className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        aria-label="Post comment"
                        className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsCreateModalOpen(false)} />

          <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users2 className="w-4 h-4" /> Start a Community Discussion
              </h3>
              <button type="button" aria-label="Close create post dialog" onClick={() => setIsCreateModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="Coding">Coding & DSA</option>
                  <option value="Placements">Placements & Interviews</option>
                  <option value="Internships">Internships</option>
                  <option value="Scholarships">Scholarships</option>
                  <option value="Higher Studies">Higher Studies (MS/GATE)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title (Optional)</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Best resources for learning System Design"
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Discussion Content *</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Ask a question, share job links, or initiate a project collaboration..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  placeholder="e.g. coding, placements, resume"
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
              >
                Publish Discussion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
