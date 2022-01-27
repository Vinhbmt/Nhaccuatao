import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MusicUserAction from '../../redux/actions/MusicUserAction';
import './style.scss';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';

const ReactListMusic = () => {

    const dispatch = useDispatch();

    const { musicState: { listMusic, titleListMusic } } = useSelector(state => {
        return { musicState: state.musicState };
    })

    const [currentPage, setCurrentPage] = useState(1);
  	const [songsPerPage] = useState(10);

    const indexOfLastSong = currentPage * songsPerPage;
  	const indexOfFirstSong = indexOfLastSong - songsPerPage;
  	const currentList = listMusic.slice(indexOfFirstSong, indexOfLastSong)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        titleListMusic !== null && 
        <div className='react-list-music'>
            <h3 className='title-list-music'>{titleListMusic}</h3>
            <hr></hr>
            <div className='list-music'>
                { listMusic.length > 0 ? 
                currentList.map((music, index) => {
                    return (
                        <div key={music._id} className='music-card'>
                            <div className='container-image-music' onClick={() => dispatch(MusicUserAction.actSetForceMusic({ music, index }))}>
                                <img src={music.image} alt={`music-image-${music.name}`}></img>
                                <span className='icon-play-music'><i className="far fa-play-circle"></i></span>
                            </div>
                            <div>
                                <p className='music-card-name' onClick={() => dispatch(MusicUserAction.actSetForceMusic({ music, index }))}>{music.name}</p>
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
                <Pagination
                    className = "pagination"
                    indexOfFirstSong={indexOfFirstSong}
                    songsPerPage={songsPerPage}
                    totalSongs={listMusic.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )

}

export default ReactListMusic;