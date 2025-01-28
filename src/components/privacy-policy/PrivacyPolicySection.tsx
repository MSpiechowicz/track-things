interface SubContent {
  title: string;
  content: string;
}

interface PrivacyPolicySectionProps {
  title: string;
  content: string;
  subcontent?: SubContent[];
  sectionNumber: string;
}

export default function PrivacyPolicySection({
  title,
  content,
  subcontent,
  sectionNumber,
}: PrivacyPolicySectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold">
        {sectionNumber}. {title}
      </h2>
      <p className="mb-4">{content}</p>
      {subcontent && (
        <ul className="list-inside list-disc space-y-4 pl-4">
          {subcontent.map((item, index) => (
            <li key={index}>
              <span className="font-semibold">{item.title}:</span> {item.content}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
