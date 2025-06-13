import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content } = formData;

    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/notes', { title, content });
      toast.success('Note created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating note', error);

      if (error?.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: '💀',
        });
      } else {
        toast.error('Failed to create note');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <Link to="/" className="btn btn-ghost mb-6 flex items-center gap-2">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-xl rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Create New Note</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text text-lg font-semibold">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Note Title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text text-lg font-semibold">Content</span>
              </label>
              <textarea
                name="content"
                placeholder="Write your note here..."
                className="textarea textarea-bordered w-full h-48"
                value={formData.content}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary px-8 py-3 text-base"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
