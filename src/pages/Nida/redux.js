// import Fetcher                          from '../../util/Request'
// import { defineAction }                 from 'redux-define'
// import {
//   showToaster,
//   showSpinner,
//   hideSpinner
// }                                        from '../_Helpers/actions'

const
  namespace = 'NIDA',
  // subActions = ['SUCCESS', 'ERROR'],

  /************ CONSTANTS ************/

  /* for async actions , includes subactions */

  /* for normal actions , doesn t include subactions */
  SET_ROOT_REDUX_STATE  = `SET_ROOT_REDUX_STATE__${namespace}`,
  INITIALIZE_REDUX_STATE  = `INITIALIZE_REDUX_STATE__${namespace}`,


  /* initial state for this part of the redux state */
  initialState = {
    cards: [
    {
      title: 'work',
      desc: 'çalışmak'
    },
    {
      title: 'play',
      desc: 'oynamak'
    }]
  }

/* ---- ---- ---- ---- ---- ---- ---- ---- ---- REDUCER ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */

export default function reducer(state = initialState, action) {

  switch(action.type) {

    case SET_ROOT_REDUX_STATE:
      return {
        ...state,
        ...action.data
      }
    case INITIALIZE_REDUX_STATE:
      return {
        ...initialState,
        //badgeCounterValues : state.badgeCounterValues
      }
    default:
      return state

  }

}


/* ---- ---- ---- ---- ---- ---- ---- ---- ---- ACTIONS ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */

/*
  this is a common purpose action creator which updates this part
  of the redux state tree, rather than creating different action
  creators, this one might be used to change a single property
  of this part of the redux tree
*/
export function setRootReduxStateProp( field, value ){
  return function( dispatch, getState ){
    dispatch({
      type: SET_ROOT_REDUX_STATE,
      data : { [ field ] : value }
    })
    return Promise.resolve()
  }
}

export function setRootReduxStateProp_multiple( keysToUpdate = {} ){
  return function( dispatch, getState ){
    dispatch({
      type: SET_ROOT_REDUX_STATE,
      data : { ...keysToUpdate }
    })
    return Promise.resolve()
  }
}

export function initializeGridReduxState(){
  return function( dispatch, getState ){
    dispatch({ type: INITIALIZE_REDUX_STATE })
    return Promise.resolve()
  }
}

/* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */



/*==============================================
=                   SECTION                    =
==============================================*/


// export function updateFilter( data ){
//   return function( dispatch, getState ) {

//     let {
//       id,
//       name,
//       description,
//       filter
//     } = data

//     dispatch(showSpinner())

//     const fetcher = new Fetcher()

//     return fetcher
//       .fetch('/api/views', {
//         method : 'post',
//         data : {
//           action    : 'update',
//           resource  : 'filter',
//           id,
//           data : {
//             name,
//             description,
//             filter
//           }
//         }
//       })
//       .then( response => {

//         dispatch(hideSpinner())

//         listFilters()( dispatch, getState )

//         showToaster({
//           isSuccess : true,
//           message : 'Successfully edited filter!'
//         })( dispatch, getState )

//         return Promise.resolve()

//       })
//       .catch( error => {
//         dispatch(hideSpinner())
//         let { error_message = 'An error occured' } = error || {}
//         showToaster({
//           isSuccess : false,
//           message : error_message
//         })( dispatch, getState )
//         return Promise.reject()
//       })
//   }
// }


/*=====  End of FILTER RELATED ACTIONS  ======*/
			
    