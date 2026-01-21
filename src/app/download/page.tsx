import { Header, Footer } from '@/components';

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4 text-center">
                <h1 className="text-6xl font-heading font-bold mb-6">Download OpenAnalyst</h1>
                <p className="text-xl text-gray-400 mb-12">
                    Available for macOS, Windows, and Linux.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.58-.69.8-1.27 2.07-1.12 3.16 1.17.09 2.38-.79 3.11-1.63z" /></svg>
                        Download for Mac
                    </button>
                    <button className="px-8 py-4 bg-brand-secondary border border-white/20 text-white font-bold rounded-lg hover:bg-brand-secondary/80 transition-colors flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.134v9.3L0 11.6V3.449zm10.649-1.6l13.353-1.854v11.3l-13.353.07V1.849zm0 20.306l13.353 1.849v-11.17l-13.353.054v9.267zM0 20.556l9.75 1.309v-9.155L0 12.56v7.996z" /></svg>
                        Download for Windows
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
