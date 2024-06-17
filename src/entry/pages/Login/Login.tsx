import { useState } from 'react';
import { AnchorLink, LoadingContentOnButton, Logo } from '../..';
import settings from '../../../utils/settings';
import { FcGoogle } from 'react-icons/fc';
import { RxGithubLogo } from 'react-icons/rx';

const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function oauthRedirect(path: string) {
        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => (window.location.href = `${settings.ENDPOINT_URL}${path}`), 500);
    }

    return (
        <section className="form-body d-flex flex-column align-items-center">
            <Logo width={50} height={50} />

            <form className="form-container py-5 px-4">
                <h1 className="mb-3">Developers area</h1>

                <p
                    className="mb-4 pb-2 text-center"
                    style={{ fontSize: '0.87rem', lineHeight: '205%', opacity: 0.4 }}
                >
                    By continuing you agree to Quyx's&nbsp;
                    <AnchorLink
                        to="/terms-of-use"
                        style={{
                            color: 'blue',
                            borderBottom: '1px solid blue',
                            wordBreak: 'keep-all',
                            whiteSpace: 'nowrap',
                            padding: '0.15rem 0.1rem',
                        }}
                    >
                        Terms of use
                    </AnchorLink>
                    . Read our&nbsp;
                    <AnchorLink
                        to="/privacy-policy"
                        style={{
                            color: 'blue',
                            borderBottom: '1px solid blue',
                            wordBreak: 'keep-all',
                            whiteSpace: 'nowrap',
                            padding: '0.15rem 0.1rem',
                        }}
                    >
                        Privacy Policy
                    </AnchorLink>
                </p>

                <button
                    className="oauth-btn mb-2"
                    type="button"
                    onClick={() => oauthRedirect('/auth/google')}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <LoadingContentOnButton text="..." color="#000" />
                    ) : (
                        <>
                            <FcGoogle size={18} />
                            <span>Continue with Google</span>
                        </>
                    )}
                </button>

                <button
                    className="oauth-btn"
                    type="button"
                    onClick={() => oauthRedirect('/auth/github')}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <LoadingContentOnButton text="..." color="#000" />
                    ) : (
                        <>
                            <RxGithubLogo size={18} />
                            <span>Continue with GitHub</span>
                        </>
                    )}
                </button>
            </form>

            <div className="extra">
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </div>
        </section>
    );
};

export default Login;
