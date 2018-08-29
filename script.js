

class Editor extends React.Component{
    render(){
        return(
            <section>
                <header></header>
                <main></main>
            </section>
        )
    }
}
class Previewer extends React.Component{
    render(){
        return(
            <h1>Previewer</h1>
        )
    }
}


class App extends React.Component{
    render(){
        return(
            <div>               
                <Editor />
                <Previewer />
            </div>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('app'));