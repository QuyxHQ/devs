import { TbAt, TbBrandGithub, TbBrandGoogle, TbClock, TbUser } from 'react-icons/tb';
import { useAppStore } from '../../context/AppProvider';
import { AnchorLink } from '../..';
import { formatDate } from '../../../utils/helpers';

const Profile = () => {
    const { userInfo } = useAppStore();

    return (
        <section>
            <h1 className="page-title mb-4">Profile</h1>

            <div className="profile-card mb-4">
                <div className="single-info">
                    <p>Full name</p>
                    <div>
                        <h4 className="title-case">{userInfo?.name}</h4>

                        <div className="icons">
                            <AnchorLink to="#">
                                <TbUser />
                            </AnchorLink>
                        </div>
                    </div>
                </div>

                <div className="single-info">
                    <p>Email address</p>
                    <div>
                        <h4>{userInfo?.email}</h4>

                        <div className="icons">
                            <AnchorLink to="#">
                                <TbAt />
                            </AnchorLink>
                        </div>
                    </div>
                </div>

                <div className="single-info">
                    <p>OAuth Provider</p>
                    <div>
                        <h4>{userInfo?.provider}</h4>

                        <div className="icons">
                            <AnchorLink to="#">
                                {userInfo?.provider == 'google' ? (
                                    <TbBrandGoogle />
                                ) : (
                                    <TbBrandGithub />
                                )}
                            </AnchorLink>
                        </div>
                    </div>
                </div>

                <div className="single-info">
                    <p>Joined</p>
                    <div>
                        <h4>{formatDate(userInfo?.createdAt)}</h4>

                        <div className="icons">
                            <AnchorLink to="#">
                                <TbClock />
                            </AnchorLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
