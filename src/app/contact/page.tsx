import { Header, Footer } from '@/components';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col text-center">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-5xl font-heading font-bold mb-6">Contact Us</h1>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you.
                </p>

                <form className="max-w-lg mx-auto space-y-6 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-brand-secondary border border-white/10 rounded-lg focus:border-brand-primary outline-none text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input type="email" className="w-full px-4 py-3 bg-brand-secondary border border-white/10 rounded-lg focus:border-brand-primary outline-none text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                        <textarea rows={4} className="w-full px-4 py-3 bg-brand-secondary border border-white/10 rounded-lg focus:border-brand-primary outline-none text-white" ></textarea>
                    </div>
                    <button type="submit" className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-all">
                        Send Message
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
}
