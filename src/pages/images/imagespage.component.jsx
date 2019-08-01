import React from 'react';
import './imagespage.styles.scss';
import ImagesDirectory from '../../components/images-directory/images-directory.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {createStructuredSelector} from 'reselect';
import {fetchImagesStart, updatePagination} from '../../redux/images/images.actions';
import {isImagesLoaded, pullImages, paginationInfo} from '../../redux/images/images.selector';

import {connect} from 'react-redux';



import {SpinnerContainer, SpinnerOverlay} from '../../components/with-spinner/with-spinner.styles';


class ImagesPage extends React.Component{

    componentDidMount(){
        console.log('did mount');
        const {fetchImagesStart} = this.props; 
        fetchImagesStart();
    }

    handlePagination =() =>{
        const {start, end, total, perPage} = this.props.pagination;
        const obj = {
                start: start+perPage,
                end: end+perPage,
        }
        console.log(obj);
        this.props.updatePagination(obj);
        
        
    }

    render(){
        const {isImagesLoaded,imageInfo} = this.props;
        const {start, end, total, perPage} = this.props.pagination;
        const next = perPage+end;
        console.log(this.props);
        return(
            <div className = "homepage">
            <span><h3>{total} Items Loaded In State</h3></span>
            <span><h3>Viewing {start} to {next} of {total}</h3></span>
            <span  onClick={this.handlePagination}><h2>Click Here To View Next {perPage} Results</h2></span>
            {
                isImagesLoaded ?
                    imageInfo
                    .filter((item,idx)=>idx>=start && idx<next)
                    .filter((item, idx) => idx < perPage)
                        .map(({id, title, thumbnailUrl}) => (
                            
                            <div  key={id} >ID:{id}<br /> {title}<span><img src ={thumbnailUrl} /></span></div>
                            
                        ))

                   
                :
                    ( <SpinnerOverlay>
                        <SpinnerContainer />
                    
                    </SpinnerOverlay>)
            }
            
            </div>
        )
    }
};

const mapStateToProps = createStructuredSelector({
   isImagesLoaded:  isImagesLoaded,
   imageInfo: pullImages,
   pagination: paginationInfo
});

const mapDispatchToProps = dispatch =>({
    fetchImagesStart: () => dispatch(fetchImagesStart()),
    updatePagination: (obj) => dispatch(updatePagination(obj))   
})

export default connect(mapStateToProps,mapDispatchToProps)(ImagesPage);