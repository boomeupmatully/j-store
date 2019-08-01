import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionsLoaded, isCollectionsLoaded} from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionPage from './collection.component';
import {compose} from 'redux';

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: isCollectionsLoaded
});

const CollectionsContainer = compose(
     connect(mapStateToProps),
     WithSpinner
)(CollectionPage)

export default CollectionsContainer;


