class CVTerminal {
  constructor() {
    this.term = new Terminal({
      cursorBlink: true,
      theme: { background: '#000', foreground: '#33ff33' }
    });
    this.term.open(document.getElementById('terminal'));
    this.prompt = '$ ';
    this.input = '';
    this.init();
  }

  init() {
    const banner = [
      "██████╗ ███████╗███████╗██╗   ██╗███╗   ███╗███████╗",
      "██╔══██╗██╔════╝██╔════╝██║   ██║████╗ ████║██╔════╝",
      "██████╔╝█████╗  ███████╗██║   ██║██╔████╔██║█████╗  ",
      "██╔══██╗██╔══╝  ╚════██║██║   ██║██║╚██╔╝██║██╔══╝  ",
      "██║  ██║███████╗███████║╚██████╔╝██║ ╚═╝ ██║███████╗",
      "╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝",
      ":: magosprime | beyondblackwall ::\n"
    ];

    let i = 0;
    const typeBanner = () => {
      if (i < banner.length) {
        this.term.writeln(banner[i++]);
        setTimeout(typeBanner, 100);
      } else {
        this.showPrompt();
        this.term.onKey(e => this.handleKey(e));
      }
    };

    typeBanner();
  }

  showPrompt() {
    this.term.write('\r\n' + this.prompt);
    this.input = '';
  }

  handleKey({ key, domEvent }) {
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
    switch (cmd.toLowerCase()) {
      case 'help':
        this.term.writeln('Available commands: help, about, skills, contact, stack, projects, blog, site, resume, uptime, clear');
        break;

      case 'about':
        this.term.writeln('I am magosprime—a sysadmin, red-hat operator, and terminal-native problem solver.');
        break;

      case 'skills':
        this.term.writeln('- Linux\n- Docker\n- Networking\n- Security\n- Tailscale\n- Reverse Proxy\n- Infrastructure as Code');
        break;

      case 'contact':
        this.term.writeln('Email: magosprime@tutamail.com');
        this.term.writeln('GitHub: https://github.com/magosprime');
        break;

      case 'stack':
        this.term.writeln('Running stack:\n- Alpine + nginx container\n- Cloudflare Tunnel\n- Docker Compose\n- Xterm.js frontend');
        break;

      case 'projects':
        this.term.writeln('• Hugo site → https://leet.neuralvoidblade.com');
        this.term.writeln('• Terminal CV → https://cv.neuralvoidblade.com');
        this.term.writeln('• WordPress blog → https://datashard.neuralvoidblade.com');
        break;

      case 'blog':
        this.term.writeln('Opening: https://datashard.neuralvoidblade.com');
        break;

      case 'site':
        this.term.writeln('Opening: https://leet.neuralvoidblade.com');
        break;

      case 'resume':
        this.term.writeln('Download CV: https://cv.neuralvoidblade.com/cv.pdf');
        break;

      case 'uptime':
        fetch('uptime.txt')
          .then(res => res.text())
          .then(txt => this.term.writeln(`Uptime: ${txt}`))
          .catch(() => this.term.writeln('Uptime: unavailable'));
        break;

      case 'clear':
        this.term.clear();
        break;

      case '':
        break;

      default:
        this.term.writeln(`${cmd}: command not found`);
    }
  }
}

window.onload = () => new CVTerminal();
