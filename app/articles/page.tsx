import ArticleExplorer from "../../components/ArticleExplorer";import {getPublicArticles} from "../../lib/content/public";
export const dynamic="force-dynamic";
export default async function Page(){const articles=await getPublicArticles();return <main><section className="pageHero contentHero"><div className="wrap"><span className="eyebrow">فکر • تحقیق • مکالمہ</span><h1>مضامین و افکار</h1><p>Admin سے شائع ہونے والے مضامین خودکار طور پر یہاں ظاہر ہوں گے۔</p></div></section><section className="section"><div className="wrap"><ArticleExplorer articles={articles}/></div></section></main>}
