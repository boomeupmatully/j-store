import React from 'react';
import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container';
import CollectionsContainer from '../../components/collection/collection.container';

import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';


class ShopPage extends React.Component{
 
    unsubscribeFromSnapshot = null;

    
    componentDidMount(){
        console.log('did mount');
        const {fetchCollectionsStart} = this.props; 
        fetchCollectionsStart();
    }

    render(){
       console.log('start render');
        const {match} = this.props;
       
        return(
            <div className="shop-page">
                <Route exact 
                    path={`${match.path}`} 
                    component={CollectionsOverviewContainer}
                />
                <Route path = {`${match.path}/:collectionId`} 
                       component = {CollectionsContainer}
                />
            </div> 
        )
    }
    
}


const mapDispatchToProps = dispatch =>({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())   
})


export default connect(null, mapDispatchToProps)(ShopPage);