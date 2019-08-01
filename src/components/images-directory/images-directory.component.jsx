import React  from 'react';
import {connect} from 'react-redux';
import './images-directory.styles.scss';

import MenuItem from '../menu-item/menu-item.component';
import {selectDirectorySections} from '../../redux/directory/directory.selector';
import {createStructuredSelector} from 'reselect';

const ImagesDirectory = ({sections}) =>(

  <div className = "directory-menu">
      {
          sections.map(({id, ...otherSectionProps}) => (
              <MenuItem key={id} {...otherSectionProps} />
          ))
      }
  </div>
)

const mapStateToProps =  createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(ImagesDirectory);