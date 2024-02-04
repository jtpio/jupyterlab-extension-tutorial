import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { Widget } from '@lumino/widgets';
import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

/**
 * Generate whatever content to render in `contentHeader`
 *
 * @returns string
 */
function generateContent(): string {
  return 'Time in GMT is: ' + new Date().toUTCString();
}

/**
 * Initialization data for the contentheader extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'contentheader:plugin',
  description: 'Minimal JupyterLab example using contentHeader.',
  autoStart: true,
  optional: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette?: ICommandPalette) => {
    console.log('JupyterLab extension contentheader is activated!');
    const command = 'jlab-examples:contentheader';
    const { commands } = app;
    // Create the command, which can be easily invoked by
    // 1- opening the Command Palette, and
    // 2- running "Populate content header...".

    commands.addCommand(command, {
      label: 'Populate content header (time example)',
      caption: 'Populate content header (time example)',
      execute: () => {
        // Check to ensure this is a MainAreaWidget
        const main = app.shell.currentWidget;

        if (main instanceof MainAreaWidget) {
          // Create a widget
          const widget = new Widget();
          widget.addClass('example-extension-contentheader-widget');
          widget.node.textContent = generateContent();

          // set the height so that it is visible
          widget.node.style.minHeight = '20px';

          // and insert it into the header
          main.contentHeader.addWidget(widget);

          // Every so often, update the widget's contents
          setInterval(() => {
            widget.node.textContent = generateContent();
          }, 1000);
        }
      }
    });
    // Create a command palette entry for easy access
    const category = 'Extension Examples';
    if (palette) {
      palette.addItem({ command, category });
    }
  }
};

export default plugin;
