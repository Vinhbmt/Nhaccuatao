import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MusicUserAction from "../../redux/actions/MusicUserAction";
import AuthAction from '../../redux/actions/AuthAction';
import "./style.scss";

const HeaderUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authState: { accountInfo, token } } = useSelector(state => {
        return { authState: state.authState };
    })

    const [ listCategory, setListCategory ] = useState([]);
    const refListCategory = useRef(null);
    const [ showListCategoryMobile , setShowListCategoryMobile] = useState(false);
    const [ showMenuHeader, setShowMenuHeader ] = useState(false);
    const refSearchInput = useRef();
    const [ showAccountInfo, setShowAccountInfo ] = useState(false);

    const asyncGetAllCategory = async () => {
        const response = await dispatch(await MusicUserAction.asyncGetCategory());
        if(response.status === 200) {
            setListCategory(response.data.data.categories);
        }
    }

    const asyncSearchMusic = async (e) => {
        if(e.key === "Enter") {
            if(refSearchInput.current.value !== "") {
                navigate(`/?keySearch=${refSearchInput.current.value}`);
                refSearchInput.current.value = "";
            }
        }
    }

    const asyncGetAccountInfo  = async () => {
        await dispatch(await AuthAction.asyncGetAccountInfo("user"));
    }

    const onSubmitLogout = async () => {
        await dispatch(await AuthAction.asyncLogout());
    }

    useEffect(() => {
        asyncGetAllCategory();
        if(token !== null && token !== undefined && token !== false) {
            asyncGetAccountInfo();
        }
    }, [])

    return (
        <div id="header">
            <div id="listMenuID" className={showMenuHeader ? "listMenuResponsive" : "listMenu"}>
                <ul>
                    <li onClick={() => navigate(`/`)}>Trang ch???</li>
                    <li className="theLoaiID" onClick={() => setShowListCategoryMobile(!showListCategoryMobile)}>
                        <p>Th??? lo???i</p>
                        <ol className={`theLoai ${showListCategoryMobile ? "viewTLResponsive" : "viewTL"}`}>
                            {
                                listCategory.length > 0 ?
                                listCategory.map((category) => {
                                    return <li key={category._id} onClick={() => navigate(`/the-loai/${category.slug_category}`)}>{category.category}</li>
                                })
                                : null
                            }
                        </ol>
                    </li>
                    <li onClick={() => navigate(`/contact`)}>Li??n h???</li>
                    { accountInfo == null ? <li onClick={() => navigate(`/login`)}>????ng nh???p</li>
                    :
                    <li onClick={() => {onSubmitLogout()}}>????ng xu???t</li>}
                </ul>
            </div>
            <div className="leftHeader">
                <i className={classnames("iconHeader",
                {
                    "fas fa-outdent" : showMenuHeader
                },
                {
                    "fas fa-bars": !showMenuHeader
                })} id="iconMenu" onClick={() => setShowMenuHeader(!showMenuHeader)}></i>
                <a id="logo" className="viewLogo" onClick={() => navigate(`/`)}><i className="fas fa-headphones-alt"></i> MUSIC ONLINE</a>
                <div id="viewSearchID" className="viewSearch">
                    <input ref={refSearchInput} type="search" id="searchHomePage" onKeyPress={asyncSearchMusic} placeholder="T??m theo b??i h??t ho???c ca s??" autoComplete="off"/>
                </div>
            </div>
            <div className="rightHeader" id="rightMenuID">
                {
                    accountInfo !== null && showAccountInfo &&
                    <ul className="accountInfo">
                        <li onClick={() => navigate(`/personal`)} >{accountInfo.name}</li>
                        <li onClick={() => navigate(`/update_user_info`)} >C???p nh???t th??ng tin</li>
                        <li onClick={() => navigate(`/change_password`)} >?????i m???t kh???u</li>
                        <li onClick={() => {onSubmitLogout()}}>????ng xu???t</li>
                    </ul>
                }
                {accountInfo == null ? 
                <a onClick={() => navigate(`/login`)}>????ng nh???p</a>
                :
                <>
                    <img src={accountInfo.avatar} alt="avatar" className="mg-r-10 mg-l-10 avatar" onClick={() => setShowAccountInfo(!showAccountInfo)}></img>
                </>}
                <a onClick={() => navigate(`/contact`)}>Li??n h???</a>
                <a className="theLoaiID" onMouseOver={() => refListCategory.current.style.display = "flex"} onMouseOut={() => refListCategory.current.style.display = "none"}>
                    <p>Th??? lo???i</p>
                    <ol ref={refListCategory} className="theLoai scale-up-ver-top">
                        {
                            listCategory.length > 0 ?
                            listCategory.map((category) => {
                                return <li key={category._id} onClick={() => navigate(`/the-loai/${category.slug_category}`)}>{category.category}</li>
                            })
                            : null
                        }
                    </ol>
                </a>
                <a onClick={() => navigate(`/`)}>Trang ch???</a>
            </div>
        </div>
    )

}   

export default HeaderUser;