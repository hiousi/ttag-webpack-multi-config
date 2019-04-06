import { t } from 'ttag';
const content = document.getElementById('content_' + LOCALE);
content.innerHTML = LOCALE + `: ${ t`Do you speak english?` }`;
