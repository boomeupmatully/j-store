import {createSelector} from 'reselect';

const selectImages = state => state.images;

export const pullImages = createSelector(
    [selectImages],
    images => images.photos
)



export const isImagesLoaded = createSelector(
    [selectImages],
    images => images.imagesDataLoaded
);

export const paginationInfo = createSelector(
    [selectImages],
    images => {
        return {
            'start': images.start,
            'end':images.end,
            'total':images.total,
            'perPage':images.perPage
        }
    }
);