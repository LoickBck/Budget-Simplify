import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blog')
            .then(response => response.json())
            .then(data => setBlogs(data));
    }, []);

    return (
        <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 mt-16 xl:mt-0">
            <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Le Blog</h1>
            {blogs.map(blog => (
                <motion.div
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow overflow-hidden sm:rounded-lg mb-6 p-6"
                >
                    <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                    <p className="mt-2 text-gray-600">{blog.content.substring(0, 100)}...</p>
                    <Link to={`/blog/${blog.id}`} className="text-primary hover:text-green-500 mt-4 block">En savoir plus</Link>
                </motion.div>
            ))}
        </div>
    );
};

export default Blog;
