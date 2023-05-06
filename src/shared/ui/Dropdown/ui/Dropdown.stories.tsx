import { ComponentStory, ComponentMeta } from '@storybook/react';
// eslint-disable-next-line ylquiorra-plugin/path-checker
import { Button } from 'shared/ui/Button';
import { Dropdown } from './Dropdown';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  trigger: <Button>Open dropdown</Button>,
  items: [
    {
      content: 'first',
      disabled: true,
      href: 'google.com',
    },
    {
      content: 'second',
      disabled: false,
      href: 'www.google.com',
    },
    {
      content: 'third',
      disabled: false,
      href: 'google.com',
    },
  ],
};
