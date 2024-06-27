import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/blog/${id}`);
                if (!response.ok) {
                    throw new Error('Article de blog non trouvé');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBlog();
    }, [id]);

    if (error) {
        return (
            <div className="bg-red-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 mt-16 xl:mt-0">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-red-900">
                        {error}
                    </h2>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 mt-16 xl:mt-0">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Chargement...
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 mt-16 xl:mt-0">
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
                >
                    <h2 className="text-3xl font-extrabold text-gray-900">{blog.title}</h2>
                    <p className="mt-2 text-gray-600">{blog.content}</p>
                    <p className="mt-6 text-sm text-gray-500">
                        Source: {blog.source || 'Unknown'}
                    </p>
                    <p className="mt-6 text-sm text-gray-500">
                        Author: {blog.author.email}
                    </p>
                    <p className="mt-6 text-sm text-gray-500">
                        Created at: {new Date(blog.createdAt).toLocaleString()}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetail;
