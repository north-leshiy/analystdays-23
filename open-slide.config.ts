import type { OpenSlideConfig } from '@open-slide/core';

// BASE_PATH задаётся в GitHub Actions (сайт живёт в подпапке /<repo>/).
// Локально dev и build работают от корня.
const openSlideConfig: OpenSlideConfig = {
  base: process.env.BASE_PATH ?? '/',
};

export default openSlideConfig;
