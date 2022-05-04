import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ProductsWebPartStrings';
import Products from './components/Products';
import { IProductsProps } from './components/IProductsProps';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IProductsWebPartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export default class ProductsWebPart extends BaseClientSideWebPart<IProductsWebPartProps> {

  private _isDarkTheme: boolean = false;
  public products: any[];


  protected async onInit(): Promise<void> {
    await super.onInit();

    // Create a SharePoint List named "Products" in the Site for your Team to use the following:
    // var sp = spfi().using(SPFx(this.context));
    // var list = await sp.web.lists.getByTitle("Products");
    // this.products = await list.items();

    // Hard-coded data for the demo:
    this.products = [
      { Code: "RPP", Title: "Raspberry Pi Pico", Price: "2.99", ImageUrl: { Url:"https://images.prismic.io/rpf-products/7d247ace-afb2-4555-b7b3-4f236eb779d6_Raspberry%20Pi%20Pico%201.jpg"}, Description: "The Raspberry Pi Pico is a microcontroller. Flexible I/O connects RP2040 to the physical world by allowing it to speak to almost any external device." },
      { Code: "RP0", Title: "Raspberry Pi Zero", Price: "4.99", ImageUrl: { Url:"https://images.prismic.io/rpf-products/656a14be-ba7e-476d-94ff-3dba02c4050e_Pi%20ZERO%20Angle%201.jpg"}, Description: "The Raspberry Pi Zero is half the size of a Model A+, with twice the utility. A tiny Raspberry Pi that’s affordable enough for any project!" },
      { Code: "RP0W", Title: "Raspberry Pi Zero W", Price: "9.99", ImageUrl: { Url:"https://images.prismic.io/rpf-products/9371b539-77d4-47f1-b89b-aa65b23c9833_RPI%20ZERO%20W%20ANGLE%202%20REFRESH_.jpg"}, Description: "The Raspberry Pi Zero W extends the Pi Zero family and comes with added wireless LAN and Bluetooth connectivity." },
      { Code: "RP02W", Title: "Raspberry Pi Zero 2W", Price: "13.50", ImageUrl: { Url:"https://images.prismic.io/rpf-products/3fe7f109-d614-4030-92cd-4bfff10d80aa_Raspberry%20Pi%20Zero%202%20W%20Hero%20WEB%20RES.jpg"}, Description: "A tiny 2nd generation single-board computer, at the heart of Raspberry Pi Zero 2 W is RP3A0, a custom-built system-in-package designed by Raspberry Pi in the UK." },
      { Code: "RP3", Title: "Raspberry Pi 3", Price: "29.99", ImageUrl: { Url:"https://images.prismic.io/rpf-products/877fb653-7b43-4931-9cee-977a22571f65_3b%20Angle%202%20refresh.jpg"}, Description: "The Raspberry Pi 3 is a 3rd generation Raspberry Pi with a quad-core processor and a 1GB of RAM. It is the perfect solution for beginners and hobbyists." },
      { Code: "RP4", Title: "Raspberry Pi 4", Price: "49.99", ImageUrl: { Url:"https://images.prismic.io/rpf-products/3a15d4da-46e3-4940-8be6-9fc7d201affe_RPi_4B_FEATURED.jpg"}, Description: "The Raspberry Pi 4 Model B is a brand new, 4th generation Raspberry Pi with a quad-core processor and a 1-8GB of RAM. It is the perfect solution for beginners and hobbyists." }
    ];
  }

  public render(): void {
    const element: React.ReactElement<IProductsProps> = React.createElement(
      Products,
      {
        description: this.properties.description,
        products: this.products
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
