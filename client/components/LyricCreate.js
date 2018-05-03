import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import query  from '../queries/fetchSongs'

class LyricCreate extends Component {
    constructor(props){
        super(props)
        this.state = {content: ''}
    
    }
    onSubmit(event){
        event.preventDefault()
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
            // ,
            // refetchQueries: [{query}]
        })
        .then(()=>{
        //     this.props.history.push('/')
            this.setState({content: ''})
         })
        //.catch(()=>{
        //   //never fail as no validation  
        // })
    }
    render() {
       
        // if (this.props.data.loading) {
        //     return <div>Loading...</div>
        // }
            return (
            <div >
                <h3> Create new Lyric</h3>
               <form 
                    onSubmit={this.onSubmit.bind(this)}>
    
                    <label> Add Lyric:</label>
                    <input
                        onChange ={event =>this.setState({ content:event.target.value})} 
                        value={this.state.content}

                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
mutation AddLyricToSong($content: String,$songId: ID){
    addLyricToSong(content: $content, songId: $songId){
     id
     lyrics{
        id
        content
        likes
     }
   } 
   }
`

export default graphql(mutation)(LyricCreate)
//export default graphql(mutation)(withRouter(SongCreate)); 
//export default LyricCreate