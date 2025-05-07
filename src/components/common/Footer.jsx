import React from 'react'

export default function Footer() {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-auto">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} ShopifyX. All rights reserved.</p>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-gray-400">Privacy</a>
                        <a href="#" className="hover:text-gray-400">Terms</a>
                        <a href="#" className="hover:text-gray-400">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
