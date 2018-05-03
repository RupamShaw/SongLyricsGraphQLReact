import React, { Component } from 'react'
import query  from '../queries/fetchSongs'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';

    class SongList extends Component {
        onSongDelete(id){
            event.preventDefault()
            this.props.mutate({
                variables: {id}
                //,
                //refetchQueries: [{query}]
            }).then(()=> this.props.data.refetch())
            // .then(()=>{
            //     this.props.history.push('/')
    
            // }).catch(()=>{
            //   //never fail as no validation  
            // })
        }
        renderSongs() {
            return this.props.data.songs.map(({id,title}) => {
                return (
                    <li key={id} className="collection-item">
                        <Link to={`/songs/${id}`}>{title}</Link>
                        <i 
                        className="material-icons"
                        onClick={()=>this.onSongDelete(id)}
                        >
                        delete
                        </i>
                    </li>
                )
            })
        }
        render() {
            if (this.props.data.loading) {
                return <div>Loading...</div>
            }
            return (
                <div>
                    <ul >
                        {this.renderSongs()}
                    </ul>
                     <Link to='/songs/new' className="btn-floating btn-large red right">
                     <i className="material-icons">add</i>
                     </Link>
                </div>
            )
        }
    }
const mutation = gql`
mutation DeleteSong($id:ID){
    deleteSong(id:$id){
       id
     }
   }
`   
export default graphql(mutation)(
    graphql(query)(SongList)
)