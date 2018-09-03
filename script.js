class Header extends React.Component{
    constructor(props){
        super(props)                       
    }
    render(){
        return(
            <header className="header">
            <i className="fab fa-free-code-camp "></i>
            <span>{this.props.text}</span>
            <i  className={this.props.classes === "show-max"? "fas fa-times" : "fas fa-expand-arrows-alt "} 
                name={this.props.text} 
                onClick={this.props.handleClick}>
            </i>           
            </header>
        )
    }
}

class 

class Editor extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section id="wrapper-editor" className={this.props.classes}>
                <Header text="Editor" handleClick={this.props.handleClick} classes={this.props.classes}/>
                <textarea id="editor"  rows="10" onChange={this.props.handleChange} value={this.props.input}></textarea>                   
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
            <section id="wrapper-previewer" className={this.props.classes}>
                <Header text="Previewer" handleClick={this.props.handleClick} classes={this.props.classes}/>
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
            '>Cooles Zeug' ,
            maxView:""                  
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getViewClass = this.getViewClass.bind(this);
    }
    handleChange(event) {
        this.setState({input: event.target.value});    
    }

    handleClick(event){
        const eventName = event.target.getAttribute("name");
        this.setState({
            maxView: this.state.maxView === eventName? "":eventName
        })
        console.log(`${eventName}:  ${this.state.maxView}`);
    }

    getViewClass(nameComponent){
        return this.state.maxView == "" ? 
            "show-normal" : nameComponent == this.state.maxView? 
            "show-max": "show-hidden"        
    }
    
    render(){
        return(
            <div id="container">               
                <Editor classes={this.getViewClass('Editor')} input={this.state.input} handleChange={this.handleChange} handleClick={this.handleClick}/>
                <Previewer classes={this.getViewClass('Previewer')} input={this.state.input} handleClick={this.handleClick}/>
            </div>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('app'));