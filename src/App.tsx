import { useMemo, useState } from 'react'

type Order = { id: string; customer: string; product: string; amount: number; status: 'Paid' | 'Pending' | 'Refunded' }

const orders: Order[] = [
  { id: '#1048', customer: 'Alex Morgan', product: 'Pro Headphones', amount: 129, status: 'Paid' },
  { id: '#1047', customer: 'Sara Lee', product: 'Smart Watch', amount: 249, status: 'Paid' },
  { id: '#1046', customer: 'Daniel Kim', product: 'USB-C Hub', amount: 79, status: 'Pending' },
  { id: '#1045', customer: 'Mia Chen', product: 'Mechanical Keyboard', amount: 159, status: 'Refunded' },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(false)
  const [active, setActive] = useState('Overview')

  const filteredOrders = useMemo(
    () => orders.filter((order) => `${order.customer} ${order.product}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">N</span><strong>Nova</strong></div>
        <nav>
          {['Overview', 'Orders', 'Customers', 'Analytics'].map((item) => (
            <button className={active === item ? 'nav-item active' : 'nav-item'} onClick={() => setActive(item)} key={item}>
              <span>{item === 'Overview' ? '⌂' : item === 'Orders' ? '▣' : item === 'Customers' ? '◉' : '◌'}</span>{item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer"><small>Portfolio Demo</small><span>React + TypeScript</span></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">Wednesday, August 19</p><h1>{active}</h1></div>
          <div className="actions"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search orders..." /><button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? '☀' : '☾'}</button><div className="avatar">SC</div></div>
        </header>

        <div className="stats">
          {[
            ['Revenue', '$24,680', '+12.8%'], ['Orders', '1,284', '+8.4%'], ['Customers', '3,642', '+18.2%'], ['Conversion', '4.82%', '+2.1%'],
          ].map(([label, value, change]) => <article className="stat" key={label}><span>{label}</span><strong>{value}</strong><small>{change} <em>vs last month</em></small></article>)}
        </div>

        <section className="grid">
          <article className="panel chart-panel"><div className="panel-head"><div><h2>Revenue overview</h2><p>Monthly performance</p></div><select><option>Last 6 months</option><option>Last 12 months</option></select></div><div className="chart"><div className="gridlines"><i/><i/><i/><i/></div><svg viewBox="0 0 700 230" preserveAspectRatio="none"><polyline points="0,185 120,150 230,165 350,85 470,115 590,45 700,70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg><div className="months"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div></div></article>
          <article className="panel"><div className="panel-head"><div><h2>Top products</h2><p>By revenue</p></div></div><div className="products">{[['Pro Headphones','$12,480','48%'],['Smart Watch','$8,920','34%'],['USB-C Hub','$3,280','18%']].map(([name, value, pct]) => <div className="product" key={name}><div className="product-icon">◈</div><div className="product-info"><strong>{name}</strong><span>{value}</span><div className="bar"><i style={{width:pct}} /></div></div><b>{pct}</b></div>)}</div></article>
        </section>

        <section className="panel orders"><div className="panel-head"><div><h2>Recent orders</h2><p>Latest customer activity</p></div><button className="text-btn">View all →</button></div><div className="table"><div className="tr th"><span>Order</span><span>Customer</span><span>Product</span><span>Amount</span><span>Status</span></div>{filteredOrders.map((o) => <div className="tr" key={o.id}><span className="muted">{o.id}</span><strong>{o.customer}</strong><span>{o.product}</span><span>${o.amount}</span><span><b className={`status ${o.status.toLowerCase()}`}>{o.status}</b></span></div>)}</div></section>
      </section>
    </main>
  )
}
