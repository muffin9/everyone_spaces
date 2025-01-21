import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Footer from './Footer';

const meta = {
  title: 'Components/Common/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <div className="flex-1"></div>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const WithNewsletterSubscription: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByPlaceholderText('이메일 주소');
    const subscribeButton = canvas.getByText('구독');

    // 이메일 입력
    await userEvent.type(emailInput, 'test@example.com');
    // 구독 버튼 클릭
    await userEvent.click(subscribeButton);
  },
};

// 소셜 미디어 링크 상호작용
export const WithSocialMediaInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const socialButtons = canvas.getAllByRole('button');

    // 각 소셜 미디어 버튼에 호버 효과
    for (const button of socialButtons) {
      await userEvent.hover(button);
      await new Promise((resolve) => setTimeout(resolve, 500)); // 호버 효과 확인을 위한 딜레이
      await userEvent.unhover(button);
    }
  },
};
