const capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const converter = (text)=>{        
    marked.setOptions({ 
        sanitize: true,
        breaks: true,
     })
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
    return marked(text, { renderer: renderer })
}

const defaultText ='# Welcome! \n ## Previewer\n '+             
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
'\t`println()`'+            
'\n'+
'\n'+

'**Wichtig** \n'    +
'>Cooles Zeug' 

class Header extends React.Component{
    constructor(props){
        super(props);        
        this.state={
            expanded: false
        }        
        this.changer = this.changer.bind(this);                  
    }    
    changer(e){             
        this.props.handleClick(e);     
        this.setState({
            expanded: !this.state.expanded
        })
    }
    render(){
        return(
            <header className="header">
                <i className="fab fa-free-code-camp "></i>
                <span>{this.props.text}</span>
                <i  className={this.state.expanded? "fas fa-angle-double-up" : "fas fa-expand-arrows-alt "} 
                    name={this.props.text} 
                    onClick={this.changer}
                    >
                </i>           
            </header>
        )
    }
}

class Section extends React.Component{
    constructor(props){
        super(props);
    }    
    render(){
        return(
            <section id={`wrapper-${this.props.name}`} className={this.props.classes}>
                <Header text={capitalize(this.props.name)} handleClick={this.props.handleClick} classes={this.props.classes}/>
                {this.props.children}
            </section>
        )
    }
}

class Editor extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Section name="editor" handleClick={this.props.handleClick} classes={this.props.classes}>
                <textarea id="editor"  rows="10" onChange={this.props.handleChange} value={this.props.input}></textarea>
            </Section>           
        )
    }
}

class Previewer extends React.Component{
    constructor(props){
        super(props)
    }      
    render(){
        return(
            <Section name="previewer" handleClick={this.props.handleClick} classes={this.props.classes}>                
                <div id="preview" dangerouslySetInnerHTML={{__html:converter(this.props.input)}}  ></div>
            </Section>                    
        )
    }
}


class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            input: defaultText,
            maxView:""                  
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);        
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