"use client";

import PrivacyPolicySection from "@/components/privacy-policy/PrivacyPolicySection";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[80ch]">
      <h1 className="mb-4 text-3xl font-bold text-white">Privacy Policy</h1>
      <h2 className="mb-10">Last updated: 20.01.2025</h2>
      <div className="prose prose-invert max-w-none">
        <PrivacyPolicySection
          title="Introduction"
          content="This Privacy Policy describes how track-things ('we', 'us', or 'our') collects, uses, and protects your personal information when you use our service."
          sectionNumber="1"
        />
        <PrivacyPolicySection
          title="Information We Collect"
          content="We collect information that you provide directly to us when using the Service:"
          subcontent={[
            {
              title: "Account Information",
              content: "Email address and authentication data from third-party providers (GitHub, Google).",
            },
            {
              title: "Usage Data",
              content: "Information about how you use the Service, including access times and pages visited.",
            },
          ]}
          sectionNumber="2"
        />
        <PrivacyPolicySection
          title="How We Use Your Information"
          content="We use the collected information for the following purposes:"
          subcontent={[
            {
              title: "Service Provision",
              content: "To provide and maintain our Service, including authentication and data storage.",
            },
            {
              title: "Security",
              content: "To protect our Service against fraud and unauthorized access.",
            },
            {
              title: "Communication",
              content: "To send you important updates about our Service.",
            },
          ]}
          sectionNumber="3"
        />
        <PrivacyPolicySection
          title="Data Storage and Security"
          content="We use Supabase for secure data storage and authentication. All data is encrypted and stored securely."
          subcontent={[
            {
              title: "Data Location",
              content: "Your data is stored in secure data centers operated by Supabase.",
            },
            {
              title: "Security Measures",
              content: "We implement industry-standard security measures to protect your data.",
            },
          ]}
          sectionNumber="4"
        />
        <PrivacyPolicySection
          title="Third-Party Services"
          content="We use third-party services for authentication:"
          subcontent={[
            {
              title: "GitHub",
              content: "When you sign in with GitHub, we receive basic profile information.",
            },
            {
              title: "Google",
              content: "When you sign in with Google, we receive basic profile information.",
            },
          ]}
          sectionNumber="5"
        />
        <PrivacyPolicySection
          title="Your Rights"
          content="You have the following rights regarding your personal data:"
          subcontent={[
            {
              title: "Access",
              content: "You can request access to your personal data.",
            },
            {
              title: "Deletion",
              content: "You can request deletion of your account and associated data.",
            },
            {
              title: "Data Portability",
              content: "You can request a copy of your data in a structured format.",
            },
          ]}
          sectionNumber="6"
        />
        <PrivacyPolicySection
          title="Contact Us"
          content="If you have any questions about this Privacy Policy, please contact us at privacy@track-things.com"
          sectionNumber="7"
        />
      </div>
      <div className="flex justify-center mb-8 sm:mb-0">
        <Button onClick={() => router.push("/")}>Return to Home Page</Button>
      </div>
    </div>
  );
}
