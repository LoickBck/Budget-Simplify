import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto p-4 mt-16 xl:mt-0">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">We value your privacy. This policy outlines how we handle your personal information.</p>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">1. Information Collection</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget urna vitae velit eleifend interdum at ac nisi. Phasellus ligula nulla, pretium eget sapien nec, iaculis posuere sapien.</p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">2. Use of Information</h2>
                <p>Maecenas feugiat augue et varius ultrices. Nullam commodo, erat quis gravida placerat, eros odio sagittis metus, ut convallis turpis enim a enim.</p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">3. Information Sharing</h2>
                <p>Curabitur venenatis ut elit quis tempus, sit amet porttitor nisl imperdiet. Nunc viverra ligula nec cursus suscipit.</p>
            </section>
            {/* Add more sections as needed */}
        </div>
    );
};

export default PrivacyPolicy;
