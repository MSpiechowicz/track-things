interface SubContent {
  title: string;
  content: string;
}

interface TermsOfServiceSectionProps {
  title: string;
  content: string;
  subcontent?: SubContent[];
  sectionNumber: string;
}

export default function TermsOfServiceSection({
  title,
  content,
  subcontent,
  sectionNumber,
}: Readonly<TermsOfServiceSectionProps>) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold">
        {sectionNumber}. {title}
      </h2>
      <p className="mb-4 max-w-[80ch]">{content}</p>
      {subcontent && subcontent.length > 0 && (
        <ul className="max-w-[80ch] list-none space-y-2">
          {subcontent.map((item, index) => (
            <li key={index}>
              <span className="font-bold">
                {sectionNumber}.{index + 1}. {item.title}:
              </span>{" "}
              {item.content}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
