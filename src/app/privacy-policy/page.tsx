import { Header, Footer } from '@/components';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-4xl font-heading font-bold mb-4" style={{ color: '#ffffff' }}>PRIVACY POLICY</h1>
                <p style={{ color: '#ff8552', fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>OpenAnalyst Inc.</p>
                <p style={{ color: '#9ca3af', marginBottom: '32px' }}>Last Updated: December 19, 2025</p>

                <div className="prose prose-invert max-w-none" style={{ color: '#d1d5db' }}>
                    <p>OpenAnalyst Inc. (&ldquo;OpenAnalyst&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) values your privacy and is committed to protecting your personal information. This Privacy Policy (&ldquo;Policy&rdquo;) explains how we collect, use, disclose, and safeguard your information when you access or use our website, mobile application, platform, and all related services (collectively, the &ldquo;Services&rdquo;).</p>

                    <p>This Privacy Policy is incorporated by reference into our Terms of Service. By using the Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy and the Terms.</p>

                    <div style={{ backgroundColor: '#18181b', border: '1px solid rgba(255, 133, 82, 0.3)', borderRadius: '12px', padding: '24px', margin: '24px 0' }}>
                        <p style={{ fontWeight: 700, color: '#ff8552', marginBottom: '8px' }}>IMPORTANT:</p>
                        <p style={{ color: '#d1d5db' }}>Please read this Privacy Policy carefully. By accessing or using the Services, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.</p>
                    </div>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>1. Information We Collect</h2>
                    <p>We collect various types of information from and about users of our Services, including information by which you may be personally identified (&ldquo;Personal Information&rdquo;).</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>1.1 Information You Provide to Us</h3>
                    <p>We collect Personal Information that you voluntarily provide to us when you register for an Account, subscribe to our Services, make a purchase, upload data, contact support, participate in surveys, connect third-party services, or communicate with us.</p>
                    <p>The types of Personal Information we may collect include:</p>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li><strong style={{ color: '#ffffff' }}>Account Information:</strong> Name, email address, username, password, phone number, job title, company name, and profile information</li>
                        <li><strong style={{ color: '#ffffff' }}>Payment Information:</strong> Credit card number, billing address, and other payment details (processed securely by our third-party payment processors)</li>
                        <li><strong style={{ color: '#ffffff' }}>User Generated Content:</strong> Data files, spreadsheets, databases, text, images, and any other content you upload or input into the Services</li>
                        <li><strong style={{ color: '#ffffff' }}>Communication Data:</strong> Messages, inquiries, feedback, and correspondence with our support team</li>
                        <li><strong style={{ color: '#ffffff' }}>Third-Party Integration Data:</strong> Information from connected accounts such as Google, Facebook, LinkedIn, or other third-party services you authorize us to access</li>
                    </ul>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>1.2 Information Collected Automatically</h3>
                    <p>When you access or use the Services, we automatically collect certain information about your device and usage patterns, including:</p>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li><strong style={{ color: '#ffffff' }}>Device Information:</strong> IP address, device type, operating system, browser type and version, device identifiers, and mobile network information</li>
                        <li><strong style={{ color: '#ffffff' }}>Usage Information:</strong> Pages visited, features used, time spent on pages, links clicked, search queries, date and time of access</li>
                        <li><strong style={{ color: '#ffffff' }}>Location Information:</strong> General geographic location based on IP address</li>
                        <li><strong style={{ color: '#ffffff' }}>Log Data:</strong> Server logs, error reports, system activity, performance metrics, and diagnostic information</li>
                        <li><strong style={{ color: '#ffffff' }}>Interaction Data:</strong> Information about how you interact with the AI Functions, including prompts, queries, inputs, and outputs</li>
                    </ul>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>1.3 Cookies and Tracking Technologies</h3>
                    <p>We use cookies, web beacons, pixels, and similar tracking technologies to collect information about your browsing activities. Types of cookies we use:</p>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li><strong style={{ color: '#ffffff' }}>Essential Cookies:</strong> Required for the Services to function properly</li>
                        <li><strong style={{ color: '#ffffff' }}>Performance Cookies:</strong> Help us improve performance and user experience</li>
                        <li><strong style={{ color: '#ffffff' }}>Functionality Cookies:</strong> Remember your preferences and settings</li>
                        <li><strong style={{ color: '#ffffff' }}>Analytics Cookies:</strong> Help us understand user behavior and measure effectiveness</li>
                        <li><strong style={{ color: '#ffffff' }}>Advertising Cookies:</strong> Deliver relevant advertisements and measure campaign effectiveness</li>
                    </ul>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>1.4 Analytics Services</h3>
                    <p>We use third-party analytics services, such as Google Analytics, to collect and analyze information about how users interact with the Services.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>1.5 Information from Third-Party Sources</h3>
                    <p>We may receive information about you from third-party sources, such as connected services, business partners, publicly available sources, and marketing partners.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>2. How We Use Your Information</h2>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>2.1 To Provide and Improve the Services</h3>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li>Create and manage your Account</li>
                        <li>Authenticate your identity and provide secure access</li>
                        <li>Process payments and manage billing</li>
                        <li>Deliver AI-powered analytics, visualizations, and reports</li>
                        <li>Provide customer support</li>
                        <li>Personalize your experience</li>
                        <li>Develop, test, and improve our Services and AI Functions</li>
                        <li>Monitor and analyze usage patterns and trends</li>
                    </ul>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>2.2 To Communicate with You</h3>
                    <p>Send service-related notifications, respond to inquiries, provide technical support, and send marketing communications (with your consent where required).</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>2.3 For Business Operations and Analytics</h3>
                    <p>Conduct data analysis and research, monitor performance and security, detect and prevent fraud, debug technical issues, and create aggregated anonymized data.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>2.4 For Legal and Compliance Purposes</h3>
                    <p>Comply with applicable laws, enforce our Terms of Service, protect our rights and safety, respond to lawful requests, and investigate illegal activities.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>2.5 AI Functions and Model Improvement</h3>
                    <div style={{ backgroundColor: '#18181b', border: '1px solid rgba(255, 133, 82, 0.3)', borderRadius: '12px', padding: '24px', margin: '24px 0' }}>
                        <p style={{ fontWeight: 700, color: '#ff8552' }}>IMPORTANT: We may use aggregated, anonymized, or de-identified data derived from your use of the AI Functions to improve the Services. However, we do NOT use your User Generated Content to train AI models for general use by other parties or to improve third-party AI services. Your data remains yours.</p>
                    </div>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>2.6 Legal Basis for Processing (EEA/UK Users)</h3>
                    <p>If you are located in the EEA or UK, we process your Personal Information based on: Consent, Contractual Necessity, Legal Obligation, and Legitimate Interests.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>3. How We Share Your Information</h2>
                    <p>We do not sell, rent, or trade your Personal Information to third parties for their marketing purposes. We may share your information with:</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>3.1 Service Providers and Business Partners</h3>
                    <p>Trusted third-party service providers including cloud hosting providers, payment processors (e.g., Stripe, PayPal), AI service providers (e.g., OpenAI, Anthropic, Google), analytics services, customer support platforms, and marketing partners.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>3.2 Legal Requirements and Protection of Rights</h3>
                    <p>We may disclose your information if required by law or to comply with legal obligations, enforce our Terms, protect our rights, or detect and prevent fraud.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>3.3 Business Transfers</h3>
                    <p>In the event of a merger, acquisition, or sale of assets, we may transfer your information with prior notice.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>3.4 With Your Consent</h3>
                    <p>We may share your information when you provide explicit consent or direct us to do so.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>3.5 Aggregated or De-Identified Information</h3>
                    <p>We may share aggregated, anonymized information that cannot reasonably identify you for research, analytics, or business purposes.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>4. Data Security</h2>
                    <p>We implement technical, administrative, and physical safeguards to protect your information, including:</p>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li><strong style={{ color: '#ffffff' }}>Encryption:</strong> Data encrypted in transit (TLS/SSL) and at rest</li>
                        <li><strong style={{ color: '#ffffff' }}>Access Controls:</strong> Role-based access controls and multi-factor authentication</li>
                        <li><strong style={{ color: '#ffffff' }}>Monitoring:</strong> Continuous security monitoring and intrusion detection</li>
                        <li><strong style={{ color: '#ffffff' }}>Vulnerability Management:</strong> Regular security assessments and penetration testing</li>
                        <li><strong style={{ color: '#ffffff' }}>Employee Training:</strong> Regular security awareness training</li>
                        <li><strong style={{ color: '#ffffff' }}>Backup and Recovery:</strong> Encrypted backups with disaster recovery procedures</li>
                    </ul>
                    <p>While we strive to protect your information, no method of transmission over the Internet is 100% secure. If you believe your Account has been compromised, please contact us immediately.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>4.1 Security Incident Response</h3>
                    <p>In the event of a security incident, we will promptly investigate, notify affected users and authorities as required by law, and implement measures to prevent future incidents.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>5. Data Retention</h2>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li><strong style={{ color: '#ffffff' }}>Account and Profile Data:</strong> Retained while active and up to 24 months after closure</li>
                        <li><strong style={{ color: '#ffffff' }}>User Generated Content:</strong> Retained while active and deleted within 24 months of closure</li>
                        <li><strong style={{ color: '#ffffff' }}>Billing and Transaction Records:</strong> Retained for 7 years for legal compliance</li>
                        <li><strong style={{ color: '#ffffff' }}>Service and Security Logs:</strong> Retained for up to 12 months</li>
                        <li><strong style={{ color: '#ffffff' }}>Backup Data:</strong> Encrypted backups retained on a rolling basis (up to 35 days)</li>
                        <li><strong style={{ color: '#ffffff' }}>Marketing Communications Data:</strong> Suppression records retained indefinitely; profile data deleted within 30 days of unsubscribe</li>
                    </ul>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>6. Your Privacy Rights and Choices</h2>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>6.1 General Privacy Rights</h3>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li><strong style={{ color: '#ffffff' }}>Right to Access:</strong> Request access to the Personal Information we hold about you</li>
                        <li><strong style={{ color: '#ffffff' }}>Right to Rectification:</strong> Request correction of inaccurate information</li>
                        <li><strong style={{ color: '#ffffff' }}>Right to Deletion:</strong> Request deletion of your Personal Information</li>
                        <li><strong style={{ color: '#ffffff' }}>Right to Data Portability:</strong> Receive your information in a machine-readable format</li>
                        <li><strong style={{ color: '#ffffff' }}>Right to Object:</strong> Object to processing for certain purposes</li>
                        <li><strong style={{ color: '#ffffff' }}>Right to Restriction:</strong> Request restriction of processing</li>
                        <li><strong style={{ color: '#ffffff' }}>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                    </ul>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>6.2 Managing Your Preferences</h3>
                    <p>You can manage your privacy preferences through Account Settings, email unsubscribe links, browser cookie settings, and by revoking third-party access through your Account.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>6.3 California Privacy Rights (CCPA/CPRA)</h3>
                    <p>California residents have the Right to Know, Right to Delete, Right to Correct, Right to Opt-Out of Sale/Sharing, and Right to Non-Discrimination. We do not sell your Personal Information.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>6.4 European Economic Area (EEA) and UK Rights (GDPR)</h3>
                    <p>EEA and UK users have rights under the GDPR including access, rectification, erasure, data portability, objection, restriction, withdrawal of consent, and the right to lodge a complaint with a supervisory authority.</p>

                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>6.5 How to Submit Privacy Requests</h3>
                    <p>You may submit privacy requests via email to info@openanalyst.com. We will acknowledge receipt within 2 business days and respond within 30 days.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>7. International Data Transfers</h2>
                    <p>OpenAnalyst is headquartered in the United States. Your information may be transferred to and processed in countries outside your country of residence. For EEA, UK, and Swiss users, we implement appropriate safeguards including Standard Contractual Clauses (SCCs), Data Processing Agreements (DPAs), and adequacy decisions.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>8. Third-Party Services and Links</h2>
                    <p>The Services may contain links to third-party websites or services not owned by OpenAnalyst. We are not responsible for the privacy practices of third parties. We encourage you to review the privacy policies of any third-party services before providing them with your information.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>9. Children&apos;s Privacy</h2>
                    <p>The Services are not intended for individuals under the age of 18. We do not knowingly collect Personal Information from children under 18. If we become aware that we have collected such information, we will take steps to delete it as quickly as possible.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>10. Contact Information</h2>
                    <div style={{ backgroundColor: '#18181b', borderRadius: '12px', padding: '24px', margin: '24px 0', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <p style={{ color: '#ffffff', fontWeight: 700, marginBottom: '8px' }}>OpenAnalyst Inc.</p>
                        <p style={{ color: '#9ca3af' }}>Email: <a href="mailto:info@openanalyst.com" style={{ color: '#ff8552' }}>info@openanalyst.com</a></p>
                    </div>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>11. Do Not Track Signals</h2>
                    <p>Currently, there is no uniform standard for recognizing and responding to DNT signals. The Services do not currently respond to DNT signals.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>12. Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. When we make material changes, we will notify you by posting the updated Policy, sending email notification, or displaying a prominent notice. Your continued use of the Services constitutes acceptance of the updated Policy.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>13. Additional Information for Specific Jurisdictions</h2>
                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>13.1 Nevada Residents</h3>
                    <p>We do not sell your Personal Information as defined under Nevada law.</p>
                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>13.2 Australia Residents</h3>
                    <p>You have rights under the Australian Privacy Act 1988 including access, correction, and complaint rights.</p>
                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>13.3 Brazil Residents</h3>
                    <p>You have rights under the Lei Geral de Prote&ccedil;&atilde;o de Dados (LGPD) including access, correction, deletion, and portability rights.</p>

                    <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginTop: '48px', marginBottom: '16px' }}>14. Response Times and Grievance Redressal</h2>
                    <p>We are committed to responding to your privacy requests in a timely manner:</p>
                    <ul style={{ color: '#d1d5db', listStyleType: 'disc', paddingLeft: '24px' }}>
                        <li><strong style={{ color: '#ffffff' }}>Acknowledgment:</strong> Within 2 business days</li>
                        <li><strong style={{ color: '#ffffff' }}>Response:</strong> Within 30 days</li>
                        <li><strong style={{ color: '#ffffff' }}>Extensions:</strong> Up to 90 days total with written notice</li>
                    </ul>

                    <div style={{ backgroundColor: '#18181b', border: '1px solid rgba(255, 133, 82, 0.3)', borderRadius: '12px', padding: '24px', margin: '48px 0 0' }}>
                        <p style={{ color: '#d1d5db', textTransform: 'uppercase', fontSize: '0.875rem' }}>BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS PRIVACY POLICY AND AGREE TO THE COLLECTION, USE, AND DISCLOSURE OF YOUR PERSONAL INFORMATION AS DESCRIBED HEREIN.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
