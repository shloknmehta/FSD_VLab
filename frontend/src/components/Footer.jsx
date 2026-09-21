import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white font-['Raleway',sans-serif] text-[14px] mt-auto select-none pt-4">
      {/* 3 Columns matching exact screenshot */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Community Links */}
        <div className="flex flex-col space-y-1.5">
          <span className="font-bold text-white text-[15px] vlabs-footer-sect-name pb-2 mb-2">
            Community Links
          </span>
          <a
            href="https://www.sakshat.ac.in/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
          >
            Sakshat Portal
          </a>
          <a
            href="http://outreach.vlabs.ac.in/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
          >
            Outreach Portal
          </a>
          <a
            href="https://vlab.co.in/faq"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
          >
            FAQ: Virtual Labs
          </a>
        </div>

        {/* Column 2: Contact Us */}
        <div className="flex flex-col space-y-1.5 text-xs sm:text-sm text-gray-300">
          <span className="font-bold text-white text-[15px] vlabs-footer-sect-name pb-2 mb-2">
            Contact Us
          </span>
          <span>Phone: General Information: 011-26582050</span>
          <span>Email: support@vlabs.ac.in</span>
          <span className="text-gray-400 text-[11px] pt-1">
            K. J. Somaiya School of Engineering (KJSSE) &bull; SVU
          </span>
        </div>

        {/* Column 3: Follow Us */}
        <div className="flex flex-col space-y-1.5">
          <span className="font-bold text-white text-[15px] vlabs-footer-sect-name pb-2 mb-2">
            Follow Us
          </span>
          <div className="flex items-center gap-2 pt-1">
            {/* Twitter */}
            <a
              href="https://twitter.com/TheVirtualLabs"
              target="_blank"
              rel="noreferrer"
              title="Twitter"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: '#55acee' }}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/Virtual-Labs-IIT-Delhi-301510159983871/"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: '#3b5998' }}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/watch?v=asxRaOgk6a0"
              target="_blank"
              rel="noreferrer"
              title="YouTube"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: '#e52d27' }}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://in.linkedin.com/in/virtual-labs-008ba9136"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: '#2867B2' }}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Sub-footer bar with AGPL & Creative Commons matching exact screenshot */}
      <div className="w-full py-2.5 text-center text-xs bg-[#0c0c0c] font-['Open_Sans',sans-serif]">
        <a
          className="text-[#2c99ce] font-bold hover:underline"
          href="https://www.gnu.org/licenses/agpl-3.0.en.html"
          target="_blank"
          rel="noreferrer"
        >
          AGPL 3.0
        </a>
        <span className="text-gray-400">&nbsp;&amp;&nbsp;</span>
        <a
          className="text-[#2c99ce] font-bold hover:underline"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          Creative Commons (CC BY-NC-SA 4.0)
        </a>
      </div>
    </footer>
  );
}

