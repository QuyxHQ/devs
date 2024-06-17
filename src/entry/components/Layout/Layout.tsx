import { useEffect, useState } from 'react';
import { Navbar, Sidebar } from '..';
import { useNavigate } from 'react-router';

const Layout = ({ children }: { children: React.JSX.Element }) => {
    const [displaySidebar, setDisplaySidebar] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => setDisplaySidebar(false), [navigate]);

    function handleOverlayClick(e: any) {
        if (e.target.classList.contains('overlay')) setDisplaySidebar(false);
    }

    return (
        <section className="body-wrapper">
            <div
                className={`overlay ${displaySidebar ? 'd-block' : 'd-none'} d-md-none`}
                onClick={handleOverlayClick}
            />

            <div className={`${displaySidebar ? 'd-block' : 'd-none'} sidebar d-md-block`}>
                <Sidebar />
            </div>

            <main className="main-wrapper">
                <Navbar setDisplaySidebar={setDisplaySidebar} />

                <div
                    className="d-flex flex-column justify-content-between"
                    style={{ minHeight: '80vh' }}
                >
                    <main className="body">{children}</main>

                    <footer className="mt-5 pt-5" style={{ borderTop: '1px solid #ddd' }}>
                        <h4 className="mb-1">
                            <strong>Quyx</strong> &copy; {new Date().getFullYear()}
                        </h4>
                        <p>
                            <span>Illustrations by:</span>&nbsp;
                            <a href="https://storyset.com" target="_blank">
                                Storyset
                            </a>
                        </p>
                    </footer>
                </div>
            </main>
        </section>
    );
};

export default Layout;
