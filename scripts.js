class CVTerminal {
  constructor() {
    this.term = new Terminal({
      cursorBlink: true,
      theme: { background: '#000', foreground: '#33ff33' }
    });
    this.term.open(document.getElementById('terminal'));
    this.prompt = '$ ';
    this.setup();
  }

  setup() {
    this.term.write('Welcome to my terminal resume!\r\n');
    this.showPrompt();
    this.term.onKey(e => this.onKey(e));
  }

  showPrompt() {
    this.term.write('\r\n' + this.prompt);
    this.input = '';
  }

  onKey({ key, domEvent }) {
    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
    switch (domEvent.key) {
      case 'Enter':
        this.term.write('\r\n');
        this.handleCommand(this.input.trim());
        this.showPrompt();
        break;
      case 'Backspace':
        if (this.input.length > 0) {
          this.input = this.input.slice(0, -1);
          this.term.write('\b \b');
        }
        break;
      default:
        if (printable) {
          this.input += key;
          this.term.write(key);
        }
    }
  }

  handleCommand(cmd) {
    switch (cmd) {
      case 'help':
        this.term.write('Available commands: help, about, skills, contact, clear');
        break;
      case 'about':
        this.term.write('I am [Fill In] a Linux/sysadmin devOps hacker...'); 
        break;
      case 'skills':
        this.term.write('- Linux\n- Docker\n- Networking\n- Security');
        break;
      case 'contact':
        this.term.write('Email: magosprime@tutamail.com\nGitHub: github.com/magosprime'); 
        break;
      case 'clear':
        this.term.clear();
        break;
      case '':
        break;
      default:
        this.term.write(`${cmd}: command not found`);
    }
  }
}

window.onload = () => new CVTerminal();
