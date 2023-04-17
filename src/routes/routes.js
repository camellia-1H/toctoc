import { config } from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';
import SignEaP from '~/layouts/components/SignEaP/SignEaP';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Live from '~/pages/Live';
import SignUp from '~/pages/SignUp';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.signup, component: SignUp, layout: SignEaP },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
