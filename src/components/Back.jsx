/* import { useHistory } from 'react-router-dom'; //TODO
import { ReactComponent as BackIcon } from '../../src/assets/back.svg';

function Back() {
  const history = useHistory();
  return (
    <div onClick={history.goBack}>
      <BackIcon />
    </div>
  );
}

export default Back;




<div className="watchlist-icon" onClick={() => handleOnClick(movie._id)}>
  <WatchlistIcon />
</div>;

<img src="/images/go_back.svg" onClick="history.back()" />;  */