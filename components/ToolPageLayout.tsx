import React from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageLayoutProps {
  title: string;
  description: string;
  features: string[];
  howItWorks: string[];
  faqs: FAQ[];
  guides?: React.ReactNode;
  children?: React.ReactNode;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  title,
  description,
  features,
  howItWorks,
  faqs,
  guides,
  children,
}) => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="mb-6 text-gray-600">{description}</p>
      {children}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <ul className="list-disc pl-6">
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">How it works</h2>
        <ol className="list-decimal pl-6">
          {howItWorks.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <p className="font-medium">Q: {faq.question}</p>
              <p className="text-gray-700">A: {faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      {guides && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Guides</h2>
          {guides}
        </section>
      )}
    </main>
  );
};

export default ToolPageLayout;
