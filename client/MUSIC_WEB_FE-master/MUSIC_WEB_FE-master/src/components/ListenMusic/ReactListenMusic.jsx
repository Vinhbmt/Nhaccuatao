import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MusicUserAction from '../../redux/actions/MusicUserAction';
import classnames from 'classnames';
//import { setCurrentPlaying } from '../../redux/actions/MusicUserAction';
import './style.scss';
import { StepForwardOutlined, StepBackwardOutlined } from "@ant-design/icons"
import { RetweetOutlined } from "@ant-design/icons"


const ReactListenMusic = () => {

    const dispatch = useDispatch();

    const { musicState: { forceMusic, indexForceMusic, listMusic, listenedMusic } } = useSelector(state => {
        return { musicState: state.musicState };
    })

    const refMusic = useRef();
    const [currSong, setCurrSong] = useState(forceMusic);
    const [repeat, setRepeat] = useState(false);

    const moveNextSong =  () => {
        setCurrSong(listMusic[Math.floor(Math.random() * listMusic.length)]);
    }


    const repeatSong = () => {
        document.getElementById("audio").currentTime = 0;    
        refMusic.current.load();
    }

    const movePrevSong = () => {
        let i = 1;
        setCurrSong(listenedMusic[i++]);
    }

    const asyncPlayMusic = async () => {
        const response = await dispatch(await MusicUserAction.asyncPlayMusic());
        if(response.status === 200) {
            dispatch(MusicUserAction.actSetListMusic([
                ...listMusic.slice(0, indexForceMusic),
                response.data.data,
                ...listMusic.slice(indexForceMusic + 1)
            ]))
        }
    } 

    const listenedHistory = () => {
        let i = listenedMusic.findIndex((song) => song._id == currSong._id)
        if (i >= 0) {
            listenedMusic.splice(i, 1)
            dispatch(MusicUserAction.actSetListenedMusic([currSong, ...listenedMusic]));
            }
        else {
            dispatch(MusicUserAction.actSetListenedMusic([currSong, ...listenedMusic]));
        }
    }       

    
    useEffect(() => {
        asyncPlayMusic();
        listenedHistory();
        refMusic.current.load();
    }, [currSong])

    useEffect(() => {
        asyncPlayMusic();
        setCurrSong(forceMusic);
        refMusic.current.load();
    }, [forceMusic])

    useEffect(() => {
        if(!repeat){
            refMusic.current.onended = () => {
                moveNextSong();
            }
        }
        else {
            refMusic.current.onended = () => {
                repeatSong();
            }
            
        }
    })

    const [ showContent, setShowContent ] = useState(false);
    const [ showTab, setShowTab ] = useState(true);
    
    useEffect(() => {
        if(showContent) {
            document.querySelector("body").style.overflow = "hidden";
        }
        else {
            document.querySelector("body").style.overflow = "overlay";
        }
    }, [showContent])

    //console.log(listenedMusic);

    
    return (
        <div className='react-listen-music'>
            { showContent && 
            <div className='content-listen-music'>
                <div className='music-tab mg-tb-20'>
                    <span className={classnames({"music-tab-active": showTab})} onClick={() => setShowTab(true)}>Lời bài hát</span>
                    <span className={classnames({"music-tab-active": !showTab})} onClick={() => setShowTab(false)}>Bình luận</span>
                </div>
                { showTab && <textarea className='music-lyrics' value={currSong.lyrics} readOnly></textarea> }
            </div> }
            <div className='footer-listen-music'>
                <div className='music-info' onClick={() => setShowContent(!showContent)}>
                    <img src={currSong.image} alt='image-music'/>
                    <div className='mg-lr-20'>
                        <span className='music-name'>{currSong.name}</span><br></br>
                        <span className='music-singer'>{currSong.singer}</span>
                    </div>
                    { !showContent ? 
                    <i className="fas fa-chevron-up"></i>
                    :
                    <i className="fas fa-chevron-down"></i> }
                </div>
                <div className='music-control'>
                    { !showContent ? 
                    <i className="fas fa-chevron-up show-content-icon" onClick={() => setShowContent(!showContent)}></i>
                    :
                    <i className="fas fa-chevron-down show-content-icon" onClick={() => setShowContent(!showContent)}></i> }
                    <div className='prev-btn'>
                        <StepBackwardOutlined  onClick={() =>{ movePrevSong()} }  />
                    </div> 
                    <audio ref={refMusic} controls autoPlay id="audio">
                        <source src={currSong.music_path} type="audio/mpeg"></source>
                    </audio>
                    <div className='next-btn'>
                        <StepForwardOutlined  onClick={() =>{ moveNextSong()} }  />
                    </div>
                    <div className={repeat ? "repeat" : "non-repeat"}>
                        <RetweetOutlined onClick={() => setRepeat(!repeat)} />
                    </div>
                    <span><i className="far fa-heart"></i></span>
                </div>
                <div className='web-info'>
                    
                </div>
            </div>
        </div>
    )
}

export default ReactListenMusic;