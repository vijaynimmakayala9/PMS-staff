import React, { useState } from 'react';
import {
  FiFile, FiFolder, FiDownload, FiTrash2, FiShare2,
  FiSearch, FiMoreVertical, FiUser, FiStar,
  FiImage, FiFileText, FiVideo, FiMusic, FiArchive, FiGrid, FiList
} from 'react-icons/fi';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
  :root {
    --t50:#f0fdfa;--t100:#ccfbf1;--t200:#99f6e4;--t300:#5eead4;--t400:#2dd4bf;
    --t500:#14b8a6;--t600:#0d9488;--t700:#0f766e;--t800:#115e59;
    --s100:#f1f5f9;--s200:#e2e8f0;--s400:#94a3b8;--s500:#64748b;
    --s600:#475569;--s700:#334155;--s800:#1e293b;
    --sur:#fff;--sur2:#f8fffe;
    --rsm:8px;--rmd:14px;--rlg:20px;
    --shmd:0 4px 16px rgba(13,148,136,.10),0 2px 6px rgba(13,148,136,.06);
    --shlg:0 10px 40px rgba(13,148,136,.14),0 4px 12px rgba(13,148,136,.08);
    --glow:0 0 0 3px rgba(20,184,166,.16);
  }
  *{box-sizing:border-box;}
  .md-root{font-family:'DM Sans',sans-serif;min-height:100vh;
    background:linear-gradient(135deg,#f0fdfa 0%,#e6faf7 40%,#f0fdf9 70%,#ecfdf5 100%);
    position:relative;overflow-x:hidden;}
  .md-root::before{content:'';position:fixed;top:-180px;right:-180px;width:540px;height:540px;
    background:radial-gradient(circle,rgba(20,184,166,.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .md-root::after{content:'';position:fixed;bottom:-140px;left:-140px;width:460px;height:460px;
    background:radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .md-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:20px 14px 64px;}
  @media(min-width:480px){.md-inner{padding:24px 18px 64px;}}
  @media(min-width:640px){.md-inner{padding:32px 24px 72px;}}
  @media(min-width:1024px){.md-inner{padding:40px 40px 80px;}}

  /* ── Header ── */
  .md-hdr{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
  @media(min-width:600px){.md-hdr{flex-direction:row;align-items:flex-start;justify-content:space-between;}}
  .md-title{font-family:'Syne',sans-serif;font-size:clamp(20px,4vw,30px);font-weight:800;
    color:var(--t800);letter-spacing:-.5px;display:flex;align-items:center;gap:10px;margin:0 0 4px;}
  .md-ticon{width:38px;height:38px;background:linear-gradient(135deg,var(--t400),var(--t600));
    border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;
    box-shadow:0 4px 14px rgba(13,148,136,.30);flex-shrink:0;}
  .md-sub{font-size:13px;color:var(--s500);margin:0;}
  .view-toggle{display:flex;background:var(--sur);border:1.5px solid var(--t100);border-radius:var(--rsm);overflow:hidden;align-self:flex-start;}
  .vt-btn{display:flex;align-items:center;gap:5px;padding:8px 14px;border:none;cursor:pointer;
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;transition:all .15s;}
  .vt-active{background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;}
  .vt-inactive{background:transparent;color:var(--s500);}
  .vt-inactive:hover{background:var(--t50);color:var(--t700);}

  /* ── Storage stats ── */
  .storage-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
  @media(min-width:640px){.storage-grid{grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;}}

  .stor-main{background:var(--sur);border-radius:var(--rlg);padding:16px;
    border:1px solid rgba(20,184,166,.10);box-shadow:var(--shmd);
    border-left:4px solid var(--t400);grid-column:1/-1;
    display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;}
  @media(min-width:640px){.stor-main{grid-column:auto;display:block;}}
  .stor-main-left{}
  .stor-label{font-size:11px;font-weight:600;color:var(--t600);margin-bottom:2px;}
  .stor-val{font-family:'Syne',sans-serif;font-size:clamp(20px,3vw,24px);font-weight:800;
    color:var(--t700);line-height:1;margin-bottom:2px;}
  .stor-sub{font-size:10px;color:var(--s500);}
  .stor-bar-track{width:100%;height:5px;background:var(--t100);border-radius:3px;
    overflow:hidden;margin-top:10px;}
  .stor-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--t400),var(--t600));
    transition:width .6s ease;}

  .stat-tile{background:var(--sur);border-radius:var(--rlg);padding:16px;text-align:center;
    border:1px solid rgba(20,184,166,.10);box-shadow:var(--shmd);
    border-left:4px solid var(--bar,var(--t400));transition:transform .2s,box-shadow .2s;}
  .stat-tile:hover{transform:translateY(-2px);box-shadow:var(--shlg);}
  .st-val{font-family:'Syne',sans-serif;font-size:clamp(20px,3vw,24px);font-weight:800;
    line-height:1;margin-bottom:4px;}
  .st-label{font-size:11px;font-weight:500;color:var(--s500);}

  /* ── Filter bar ── */
  .filter-bar{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:14px 16px;margin-bottom:18px;
    display:flex;flex-direction:column;gap:12px;}
  @media(min-width:768px){.filter-bar{flex-direction:row;align-items:center;justify-content:space-between;}}
  .search-wrap{position:relative;flex:1;min-width:0;}
  .search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);
    color:var(--t400);font-size:14px;pointer-events:none;}
  .search-input{width:100%;padding:10px 14px 10px 40px;
    border:1.5px solid var(--t100);border-radius:var(--rsm);
    font-family:'DM Sans',sans-serif;font-size:13px;color:var(--s700);
    background:var(--sur2);outline:none;transition:all .2s;}
  .search-input:focus{border-color:var(--t400);box-shadow:var(--glow);background:#fff;}
  .search-input::placeholder{color:var(--s400);}
  .sel{padding:9px 30px 9px 13px;border:1.5px solid var(--t100);border-radius:var(--rsm);
    font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:var(--s600);
    background:var(--sur2);outline:none;cursor:pointer;transition:all .2s;
    appearance:none;-webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 9px center;}
  .sel:focus{border-color:var(--t400);box-shadow:var(--glow);}

  /* ── Grid view ── */
  .docs-grid{display:grid;grid-template-columns:1fr;gap:12px;}
  @media(min-width:480px){.docs-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:768px){.docs-grid{grid-template-columns:repeat(3,1fr);gap:14px;}}
  @media(min-width:1200px){.docs-grid{grid-template-columns:repeat(4,1fr);}}

  .doc-card{background:var(--sur);border-radius:var(--rlg);padding:16px;
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);
    transition:all .2s;position:relative;overflow:hidden;}
  .doc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--t300),var(--t500));}
  .doc-card:hover{transform:translateY(-2px);box-shadow:var(--shlg);}

  .doc-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;}
  .doc-thumb{width:40px;height:40px;border-radius:10px;
    display:flex;align-items:center;justify-content:center;font-size:18px;
    background:var(--t50);flex-shrink:0;border:1px solid var(--t100);}
  .doc-name-wrap{flex:1;min-width:0;margin:0 8px;}
  .doc-name{font-size:12px;font-weight:700;color:var(--s800);
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px;}
  .doc-type-tag{font-size:10px;font-weight:700;color:var(--t600);
    background:var(--t50);border:1px solid var(--t200);padding:1px 7px;
    border-radius:20px;display:inline-block;}
  .star-icon{color:#f59e0b;font-size:13px;flex-shrink:0;}
  .more-btn{background:none;border:none;cursor:pointer;color:var(--s400);
    font-size:14px;padding:2px;border-radius:5px;display:flex;align-items:center;}
  .more-btn:hover{background:var(--t50);color:var(--t600);}

  .doc-meta{display:flex;flex-direction:column;gap:4px;margin-bottom:10px;}
  .doc-meta-row{display:flex;justify-content:space-between;font-size:10px;color:var(--s500);}
  .doc-meta-val{font-weight:600;color:var(--s700);}

  .cat-badge{display:inline-block;padding:2px 9px;border-radius:20px;
    font-size:10px;font-weight:700;margin-bottom:6px;}
  .cat-work{background:#cffafe;color:#0e7490;}
  .cat-personal{background:#dcfce7;color:#166534;}

  .tags-wrap{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:12px;}
  .tag{padding:2px 8px;background:var(--t50);color:var(--t700);
    border:1px solid var(--t200);border-radius:20px;font-size:9px;font-weight:600;}
  .tag-more{padding:2px 7px;background:var(--s100);color:var(--s500);
    border-radius:20px;font-size:9px;font-weight:600;}

  .card-actions{display:flex;gap:6px;padding-top:10px;border-top:1px solid var(--t50);}
  .btn-dl{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:7px;
    font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 2px 8px rgba(13,148,136,.20);}
  .btn-dl:hover{background:linear-gradient(135deg,var(--t400),var(--t500));}
  .btn-share{display:flex;align-items:center;justify-content:center;
    width:30px;height:30px;border:1.5px solid var(--t200);border-radius:var(--rsm);
    background:var(--t50);color:var(--t600);cursor:pointer;
    font-size:13px;transition:all .15s;flex-shrink:0;}
  .btn-share:hover{background:var(--t100);}

  /* ── List view ── */
  .list-card{background:var(--sur);border-radius:var(--rlg);
    box-shadow:var(--shmd);border:1px solid rgba(20,184,166,.10);overflow:hidden;}
  .table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .table-wrap::-webkit-scrollbar{height:5px;}
  .table-wrap::-webkit-scrollbar-track{background:var(--t50);}
  .table-wrap::-webkit-scrollbar-thumb{background:var(--t300);border-radius:3px;}
  table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;}
  thead tr{background:linear-gradient(to right,var(--t50),var(--t100));}
  thead th{padding:13px 16px;text-align:left;font-size:10px;font-weight:700;
    text-transform:uppercase;letter-spacing:.06em;color:var(--t700);
    white-space:nowrap;border-bottom:2px solid var(--t200);}
  tbody tr{transition:background .15s;border-bottom:1px solid var(--s100);}
  tbody tr:last-child{border-bottom:none;}
  tbody tr:hover{background:var(--t50);}
  td{padding:12px 16px;vertical-align:middle;}

  .list-doc-name{font-size:13px;font-weight:700;color:var(--s800);margin-bottom:2px;}
  .list-doc-type{font-size:10px;font-weight:600;color:var(--t600);
    background:var(--t50);border:1px solid var(--t200);padding:1px 7px;
    border-radius:20px;display:inline-block;margin-top:2px;}
  .list-size{font-size:12px;color:var(--s600);white-space:nowrap;}
  .list-date{font-size:12px;color:var(--s600);white-space:nowrap;}
  .shared-cell{display:flex;align-items:center;gap:4px;font-size:12px;color:var(--s500);}
  .action-btns{display:flex;gap:4px;}
  .tbl-btn{width:30px;height:30px;border:none;border-radius:7px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;font-size:13px;
    transition:all .15s;background:transparent;}
  .tbl-dl{color:var(--t600);}
  .tbl-dl:hover{background:var(--t50);}
  .tbl-share{color:#16a34a;}
  .tbl-share:hover{background:#f0fdf4;}
  .tbl-del{color:#dc2626;}
  .tbl-del:hover{background:#fef2f2;}

  /* ── Empty ── */
  .empty{background:var(--sur);border-radius:var(--rlg);box-shadow:var(--shmd);
    border:1px solid rgba(20,184,166,.10);padding:48px 24px;text-align:center;}
  .empty-icon{font-size:36px;color:var(--t300);margin-bottom:12px;}
  .empty-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--t800);margin:0 0 6px;}
  .empty-sub{font-size:13px;color:var(--s500);margin:0 0 20px;}
  .btn-upload{display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--t500),var(--t600));color:#fff;
    border:none;border-radius:var(--rsm);padding:12px 20px;
    font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
    transition:all .2s;box-shadow:0 4px 12px rgba(13,148,136,.28);}
  .btn-upload:hover{transform:translateY(-1px);}
`;

const documents = [
  { id:1, name:'Project Proposal.pdf',     type:'pdf',     size:'2.4 MB',   category:'work',     uploadDate:'2024-06-15', modifiedDate:'2024-06-18', sharedWith:3,  starred:true,  tags:['proposal','client','q2'],       thumbnail:'📄' },
  { id:2, name:'Quarterly Report.docx',    type:'doc',     size:'1.8 MB',   category:'work',     uploadDate:'2024-06-10', modifiedDate:'2024-06-12', sharedWith:5,  starred:true,  tags:['report','quarterly','financial'],thumbnail:'📝' },
  { id:3, name:'Team Photo.jpg',           type:'image',   size:'4.2 MB',   category:'personal', uploadDate:'2024-06-08', modifiedDate:'2024-06-08', sharedWith:8,  starred:false, tags:['team','photo','event'],          thumbnail:'🖼️' },
  { id:4, name:'Budget Spreadsheet.xlsx',  type:'sheet',   size:'3.1 MB',   category:'work',     uploadDate:'2024-06-05', modifiedDate:'2024-06-20', sharedWith:2,  starred:true,  tags:['budget','finance','2024'],       thumbnail:'📊' },
  { id:5, name:'Presentation Deck.pptx',   type:'ppt',     size:'5.7 MB',   category:'work',     uploadDate:'2024-06-03', modifiedDate:'2024-06-17', sharedWith:12, starred:false, tags:['presentation','client','deck'],  thumbnail:'📑' },
  { id:6, name:'Vacation Photos.zip',      type:'archive', size:'45.2 MB',  category:'personal', uploadDate:'2024-05-28', modifiedDate:'2024-05-28', sharedWith:0,  starred:false, tags:['vacation','photos','family'],    thumbnail:'📦' },
  { id:7, name:'Meeting Recording.mp4',    type:'video',   size:'125.8 MB', category:'work',     uploadDate:'2024-05-25', modifiedDate:'2024-05-25', sharedWith:4,  starred:false, tags:['meeting','recording','team'],    thumbnail:'🎥' },
  { id:8, name:'Resume.pdf',               type:'pdf',     size:'1.2 MB',   category:'personal', uploadDate:'2024-05-20', modifiedDate:'2024-06-10', sharedWith:0,  starred:true,  tags:['resume','career','professional'],thumbnail:'📄' },
];

const catCls = c => ({work:'cat-work',personal:'cat-personal'}[c]||'');
const fmtDate = d => new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
const storageStats = {
  used:45.2, total:100,
  total_files: documents.length,
  images: documents.filter(d=>d.type==='image').length,
  pdfs:   documents.filter(d=>d.type==='pdf').length,
};

const MyDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [catFilter, setCatFilter]   = useState('all');
  const [viewMode, setViewMode]     = useState('grid');

  const filtered = documents.filter(d => {
    const s = searchTerm.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(s) || d.tags.some(t=>t.toLowerCase().includes(s));
    const matchCat = catFilter==='all'
      || (catFilter==='starred' ? d.starred : d.category===catFilter);
    return matchSearch && matchCat;
  });

  return (
    <div className="md-root">
      <style>{style}</style>
      <div className="md-inner">

        {/* Header */}
        <div className="md-hdr">
          <div>
            <h1 className="md-title"><span className="md-ticon"><FiFolder/></span>My Documents</h1>
            <p className="md-sub">Manage and organise your documents and files</p>
          </div>
          <div className="view-toggle">
            <button className={`vt-btn ${viewMode==='grid'?'vt-active':'vt-inactive'}`} onClick={()=>setViewMode('grid')}>
              <FiGrid style={{fontSize:12}}/>Grid
            </button>
            <button className={`vt-btn ${viewMode==='list'?'vt-active':'vt-inactive'}`} onClick={()=>setViewMode('list')}>
              <FiList style={{fontSize:12}}/>List
            </button>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="storage-grid">
          {/* Storage bar — spans 2 cols on mobile, 1 on desktop */}
          <div className="stor-main">
            <div className="stor-main-left">
              <div className="stor-label">Storage Used</div>
              <div className="stor-val">{storageStats.used} GB</div>
              <div className="stor-sub">of {storageStats.total} GB total</div>
            </div>
            <div style={{width:'100%',maxWidth:'none'}}>
              <div className="stor-bar-track" style={{marginTop:8}}>
                <div className="stor-bar-fill" style={{width:`${(storageStats.used/storageStats.total)*100}%`}}/>
              </div>
            </div>
          </div>

          {[
            {label:'Total Files',  val:storageStats.total_files, color:'var(--t700)', bar:'var(--t400)'},
            {label:'Images',       val:storageStats.images,      color:'#7c3aed',     bar:'#8b5cf6'    },
            {label:'PDF Files',    val:storageStats.pdfs,        color:'#dc2626',     bar:'#ef4444'    },
          ].map((s,i)=>(
            <div key={i} className="stat-tile" style={{'--bar':s.bar}}>
              <div className="st-val" style={{color:s.color}}>{s.val}</div>
              <div className="st-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="filter-bar">
          <div className="search-wrap">
            <FiSearch className="search-icon"/>
            <input className="search-input" type="text"
              placeholder="Search by name or tags…"
              value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
          </div>
          <select className="sel" value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="starred">Starred</option>
            <option value="shared">Shared</option>
          </select>
        </div>

        {/* Grid View */}
        {viewMode==='grid' && filtered.length>0 && (
          <div className="docs-grid">
            {filtered.map(doc=>(
              <div key={doc.id} className="doc-card">
                <div className="doc-card-top">
                  <div className="doc-thumb">{doc.thumbnail}</div>
                  <div className="doc-name-wrap">
                    <div className="doc-name">{doc.name}</div>
                    <span className="doc-type-tag">{doc.type.toUpperCase()}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:4,flexShrink:0}}>
                    {doc.starred && <FiStar className="star-icon"/>}
                    <button className="more-btn"><FiMoreVertical/></button>
                  </div>
                </div>

                <div className="doc-meta">
                  <div className="doc-meta-row">
                    <span>Size</span><span className="doc-meta-val">{doc.size}</span>
                  </div>
                  <div className="doc-meta-row">
                    <span>Modified</span><span className="doc-meta-val">{fmtDate(doc.modifiedDate)}</span>
                  </div>
                  {doc.sharedWith>0 && (
                    <div className="doc-meta-row">
                      <span>Shared with</span>
                      <span className="doc-meta-val" style={{color:'var(--t600)'}}>{doc.sharedWith} people</span>
                    </div>
                  )}
                </div>

                <span className={`cat-badge ${catCls(doc.category)}`}>{doc.category}</span>
                <div className="tags-wrap">
                  {doc.tags.slice(0,2).map((t,i)=><span key={i} className="tag">{t}</span>)}
                  {doc.tags.length>2&&<span className="tag-more">+{doc.tags.length-2}</span>}
                </div>

                <div className="card-actions">
                  <button className="btn-dl"><FiDownload style={{fontSize:11}}/>Download</button>
                  <button className="btn-share"><FiShare2/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode==='list' && filtered.length>0 && (
          <div className="list-card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Modified</th>
                    <th>Shared</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(doc=>(
                    <tr key={doc.id}>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <span style={{fontSize:18,flexShrink:0}}>{doc.thumbnail}</span>
                          <div>
                            <div style={{display:'flex',alignItems:'center',gap:6}}>
                              <span className="list-doc-name">{doc.name}</span>
                              {doc.starred&&<FiStar style={{color:'#f59e0b',fontSize:12}}/>}
                            </div>
                            <span className="list-doc-type">{doc.type.toUpperCase()}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className={`cat-badge ${catCls(doc.category)}`} style={{margin:0}}>{doc.category}</span></td>
                      <td><span className="list-size">{doc.size}</span></td>
                      <td><span className="list-date">{fmtDate(doc.modifiedDate)}</span></td>
                      <td>
                        <div className="shared-cell">
                          <FiUser style={{fontSize:11,color:'var(--t400)'}}/>
                          {doc.sharedWith}
                        </div>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="tbl-btn tbl-dl"  title="Download"><FiDownload/></button>
                          <button className="tbl-btn tbl-share" title="Share"><FiShare2/></button>
                          <button className="tbl-btn tbl-del"  title="Delete"><FiTrash2/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filtered.length===0 && (
          <div className="empty">
            <div className="empty-icon"><FiFolder/></div>
            <p className="empty-title">No documents found</p>
            <p className="empty-sub">Try adjusting your search or filters</p>
            <button className="btn-upload">
              <FiFile style={{fontSize:14}}/>Upload Your First Document
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyDocuments;