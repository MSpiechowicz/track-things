import TermsOfServiceSection from "@/components/terms-of-service/TermsOfServiceSection";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - track-things",
  description: "Terms of Service for track-things",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto flex flex-1 justify-center px-4 py-8 text-white">
      <div className="w-full max-w-[80ch]">
        <h1 className="mb-4 text-3xl font-bold text-white">Terms of Service</h1>
        <h2 className="mb-10">Effective date: 20.01.2025</h2>
        <div className="prose prose-invert max-w-none">
          <TermsOfServiceSection
            title="Introduction"
            content="Welcome to track-things (&quot;Service&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our platform, which provides authentication and secure data storage powered by Supabase. By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service."
            sectionNumber="1"
          />
          <TermsOfServiceSection
            title="Description of the Service"
            content="The Service enables users to securely authenticate and store their data. The Service leverages Supabase’s infrastructure to handle authentication, authorization, and secure data storage. As part of our commitment to privacy, the administration team does not have access to user data stored within the Service."
            sectionNumber="2"
          />
          <TermsOfServiceSection
            title="User Accounts"
            content="To use the Service, you need to create and maintain an account. By creating an account, you agree to the following terms:"
            subcontent={[
              {
                title: "Account Registration",
                content:
                  "To use the Service, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account.",
              },
              {
                title: "Eligibility",
                content:
                  "You must be at least 18 years old or have the permission of a legal guardian to use the Service.",
              },
              {
                title: "Account Security",
                content:
                  "You agree to notify us immediately if you suspect unauthorized access to your account. We are not liable for any loss or damage resulting from unauthorized use of your account.",
              },
            ]}
            sectionNumber="3"
          />
          <TermsOfServiceSection
            title="Data Security and Privacy"
            content="We take the security and privacy of user data seriously. We use encryption and other security measures to protect user data from unauthorized access or disclosure."
            subcontent={[
              {
                title: "Data Ownership",
                content: "All data you store within the Service remains your property.",
              },
              {
                title: "Administrative Access",
                content:
                  "Our administration team does not have access to your data stored within the Service. The data is encrypted and securely stored using Supabase’s infrastructure.",
              },
              {
                title: "Privacy Policy",
                content:
                  "By using the Service, you consent to the practices described in our Privacy Policy, which outlines how we collect, use, and protect your data.",
              },
            ]}
            sectionNumber="4"
          />
          <TermsOfServiceSection
            title="User Responsibilities"
            content="You are responsible for maintaining the security of your account and for all activities that occur under your account. You agree not to use the Service for any illegal or unauthorized purpose."
            subcontent={[
              {
                title: "Compliance with Laws",
                content:
                  "You agree to use the Service only for lawful purposes and in compliance with applicable laws and regulations.",
              },
              {
                title: "Prohibited Activities",
                content:
                  "You agree not to store or share unlawful, harmful, or offensive content. ",
              },
              {
                title: "User Conduct",
                content:
                  "You agree not to use the Service for any illegal or unauthorized purpose, attempt to gain unauthorized access to any part of the Service, or interfere with or disrupt the operation of the Service.",
              },
            ]}
            sectionNumber="5"
          />
          <TermsOfServiceSection
            title="Limitation of Liability"
            content="To the maximum extent permitted by law, track-things and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service."
            sectionNumber="6"
          />
          <TermsOfServiceSection
            title="Modifications to the Terms"
            content="We reserve the right to modify these Terms at any time. Any changes will be effective upon posting the revised Terms on our platform. Your continued use of the Service constitutes acceptance of the updated Terms."
            sectionNumber="7"
          />
          <TermsOfServiceSection
            title="Termination"
            content="We may terminate or suspend your access to the Service at our discretion, with or without notice, if you violate these Terms or if we are required to do so by law."
            sectionNumber="8"
          />
          <TermsOfServiceSection
            title="Governing Law"
            content="These Terms shall be governed by and construed in accordance with the laws of Poland."
            sectionNumber="9"
          />
          <TermsOfServiceSection
            title="Contact Us"
            content="If you have any questions about these Terms, please contact us at contact@track-things.com."
            sectionNumber="10"
          />
        </div>
      </div>
    </div>
  );
}
