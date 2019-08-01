import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionsLoaded,isCollectionsLoaded} from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';
import {compose} from 'redux';

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded:  isCollectionsLoaded
});

const CollectionsOverviewContainer = compose(
     connect(mapStateToProps),
     WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;


