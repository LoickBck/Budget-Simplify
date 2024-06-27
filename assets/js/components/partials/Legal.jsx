import React from 'react';

const Legal = () => {
    return (
        <div className="container mx-auto p-4 mt-16 xl:mt-0">
            <h1 className="text-4xl font-bold mb-4">Legal</h1>
            <p className="mb-4">Here you will find our legal information and disclaimers.</p>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">1. Legal Notice</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget urna vitae velit eleifend interdum at ac nisi. Phasellus ligula nulla, pretium eget sapien nec, iaculis posuere sapien.</p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">2. Disclaimers</h2>
                <p>Maecenas feugiat augue et varius ultrices. Nullam commodo, erat quis gravida placerat, eros odio sagittis metus, ut convallis turpis enim a enim.</p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
                <p>Curabitur venenatis ut elit quis tempus, sit amet porttitor nisl imperdiet. Nunc viverra ligula nec cursus suscipit.</p>
            </section>
            {/* Add more sections as needed */}
        </div>
    );
};

export default Legal;
