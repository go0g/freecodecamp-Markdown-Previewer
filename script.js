class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <header className="header">
            <i className="fab fa-free-code-camp"></i>
            <span>{this.props.text}</span>
            <i className="fas fa-expand-arrows-alt"></i>
            </header>
        )
    }
}

class Editor extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section>
                <Header text="Editor"/>
                <textarea id="editor" cols="30" rows="10" onChange={this.props.handleChange} value={this.props.input}></textarea>                   
            </section>
        )
    }
}
class Previewer extends React.Component{
    constructor(props){
        super(props)
    }
    converter(text){        
        marked.setOptions({ 
            sanitize: true,
            breaks: true,
         })
        const renderer = new marked.Renderer()
        renderer.link = (href, title, text) => `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
        return marked(text, { renderer: renderer })
    }   
    render(){
        return(
            <section>
                <Header text="Previewer" />
                <div id="preview" dangerouslySetInnerHTML={{__html:this.converter(this.props.input)}}  ></div>
            </section>            
        )
    }
}


class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            input: 
            '# Welcome! \n ## Previewer\n '+             
            '[Ein Link](#) \n' +
            '     \n'+
            '     \n'+            
            '1. Tante \n'+
            '1. Onkel  \n' + 
            '     \n'+
            '     \n'+
            ' Das ist ein Absatz  \n' + 
            '     \n'+
            '     \n'+
            '![Ein Bild](https://via.placeholder.com/350x150)\n'  +
            '     \n'+
            '\t`println()println()println()println()println()println()`'+            
            '\n'+
            '\n'+
            
            '**Wichtig** \n'    +
            '>Das ist doch eine große Scheiße'                   
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({input: event.target.value});
      }
    
    render(){
        return(
            <div>               
                <Editor input={this.state.input} handleChange={this.handleChange}/>
                <Previewer input={this.state.input}/>
            </div>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('app'));