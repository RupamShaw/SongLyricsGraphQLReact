import React, { Component } from 'react'
import query  from '../queries/fetchSong'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';
import { compose } from 'react-apollo'
import { optimistic } from 'apollo-client/optimistic-data/store';
//let clickedbutton = "";
class LyricList extends Component {
    onLyricLike(id, likes) {
      //  event.preventDefault()
        //      clickedbutton = "Like";

        this.props.likeLyric({
            variables: { id },
            optimisticResponse: {
                __typeName: 'Mutation',
                likeLyric: {
                    id,
                    __typeName: 'LyricType',
                    likes: likes+1
                }
            }
        })
        //.then(()=> this.props.data.refetch())
        // .then(()=>{
        //     this.props.history.push('/')

        // }).catch(()=>{
        //   //never fail as no validation  
        // })
    }
    onLyricDelete(id) {
        event.preventDefault()
        // console.log('in ondelete before',clickedbutton)
        // clickedbutton = "Delete";
        // console.log('in ondelete after',clickedbutton)

        this.props.deleteLyric({
            variables: { id },
            refetchQueries: [{
                query,
                variables: {id: this.props.songId}
            }]
        })
           // .then(() => this.props.lyr)
        // clickedbutton = "";
        // .then(()=>{
        //     this.props.history.push('/')

        // }).catch(()=>{
        //   //never fail as no validation  
        // })
    }
    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="like-delete-icons">
                        <i
                            className="material-icons"
                            onClick={() => this.onLyricDelete(id)}
                        >
                            delete
                        </i>

                        <div className="vote-box">
                            <i
                                className="material-icons"
                                onClick={() => this.onLyricLike(id, likes)}
                            >
                                thumb_up
                            </i>
                            {likes}
                        </div>
                    </div>

                </li>
            )
        })
    }
    render() {
        console.log('this.props',this.props)
        // if (this.props.data.loading) {
        //     return <div>Loading...</div>
        // }
        return (
            <div>
                <ul >
                    {this.renderLyrics()}


                </ul>
                {/* <Link to='/Lyrics/new' className="btn-floating btn-large red right">
                     <i className="material-icons">add</i>
                     </Link> */}
            </div>
        )
    }
}

// if (clickedbutton === "Delete") {
//    console.log('in delete')
//     mutation = gql`
//     mutation DeleteLyric($id:ID){
//         deleteLyric(id:$id){
//         id
//         }
//    }
// `;
// clickedbutton=""
// } else {
//     console.log('in like')
//     mutation = gql`
//         mutation LikeLyric($id:ID){
//             likeLyric(id:$id){
//                 id
//                 content
//                 likes
//             }
//         }
//     `   
// }

const likeLyric = gql`
        mutation LikeLyric($id:ID){
            likeLyric(id:$id){
                id
                content
                likes
            }
        }
    `
const deleteLyric = gql`
    mutation DeleteLyric($id:ID){
        deleteLyric(id:$id){
             id
        }
   }
`;

const LyricListWithMutations = compose(
    graphql(likeLyric, {
        name: 'likeLyric'
    }),
    graphql(deleteLyric, {
        name: 'deleteLyric'
    })
)(LyricList)

export default LyricListWithMutations
//export default graphql(mutation)(LyricList)
//export default LyricList
// export default graphql(mutation)(
//     graphql(query)(SongList)
// )