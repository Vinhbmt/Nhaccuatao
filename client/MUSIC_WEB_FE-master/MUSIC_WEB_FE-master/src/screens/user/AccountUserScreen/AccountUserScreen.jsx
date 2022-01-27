import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import './style.scss';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AuthAction from "../../../redux/actions/AuthAction";

const AccountUserScreen = () => {

    const { musicState: { forceMusic, indexForceMusic, listMusic, listenedMusic } } = useSelector(state => {
        return { musicState: state.musicState };
    })

    console.log(listenedMusic);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authState: { accountInfo } } = useSelector(state => {
        return { authState: state.authState };
    })

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("user"));
        if(response.status === 401 || response.data.data.role != "user") {
            navigate('/login');
        }
    }

    useEffect(async () => {
        asyncGetAccountInfo();
    }, [])


    return (
        accountInfo !== null &&
        <div className="user-info">
            <div className="info my-4">
                <div className="title">
                    <h3>Thông tin cá nhân</h3>
                </div>
                <hr />
                <div className="detail-info">
                    <img src={accountInfo.avatar} alt="avatar" />
                    <div className="contact-info">
                        <div className="mg-t-15">
                            <span className="title1">Tên người dùng: </span>
                            <span>{accountInfo.name}</span>
                        </div>
                        <div className="mg-t-15">
                            <span className="title1">Email: </span>
                            <span>{accountInfo.email}</span>
                        </div>
                        <div className="mg-t-15">
                            <span className="title1">Địa chỉ: </span>
                            <span>{accountInfo.address || "Không có"}</span>
                        </div>
                        <div className="mg-t-15">
                            <span className="title1">Quốc gia: </span>
                            <span>{accountInfo.country || "Không có"}</span>
                        </div>
                        <div className="mg-t-15">
                            <span className="title1">Vai trò: </span>
                            <span>{accountInfo.role}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="music-info">
                <div className="title-list-music">
                    <h3>Nghe gần đây</h3>
                </div>
                <hr />
                <div className='list-music'>
                    { listenedMusic.length > 0 ? 
                    listenedMusic.slice(0, 5).map((music) => {
                        return (
                            <div key={music._id} className='music-card'>
                                <div className='container-image-music'>
                                    <img src={music.image} alt={`music-image-${music.name}`}></img>
                                    <span className='icon-play-music'><i className="far fa-play-circle"></i></span>
                                </div>
                                <div>
                                    <p className='music-card-name'>{music.name}</p>
                                    <p className='music-card-singer'>{music.singer}</p>
                                </div>
                                <div className='music-card-action'>
                                    <span><i className="fas fa-headphones"></i> {music.viewer}</span>
                                    {/* <span><i className="far fa-heart"></i></span> */}
                                </div>
                            </div>
                        )
                    })
                    :
                    <div style={{"margin": "auto"}}>Không có bài hát nào</div> }
                </div>
            </div>
        </div>
    )
}

export default AccountUserScreen