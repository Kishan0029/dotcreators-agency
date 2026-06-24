import { o as __toESM } from "../_runtime.mjs";
import { i as useFrame, n as OrbitControls, o as require_jsx_runtime, r as Canvas, s as require_react, t as Sphere } from "../_libs/@react-three/drei+[...].mjs";
import { n as motion, t as useInView } from "../_libs/framer-motion.mjs";
import { n as Check, r as ArrowRight, t as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Da3ToZQC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var pai_convention_default = "/assets/pai-convention-Cib4hdK0.png";
var logo2026_default = "/assets/logo2026-Bthpjnet.png";
var summit_logo_default = "/assets/summit-logo-C-Y7GeUc.png";
var supabase = createClient("https://cdfoywrqdkthegksvsrh.supabase.co", "sb_publishable_zATVmCb3-G-8a2CSQintfw_QL5waaVb");
function createRing(count, radius, z, colors) {
	return Array.from({ length: count }, (_, idx) => {
		const angle = idx / count * Math.PI * 2;
		const color = colors[idx % colors.length];
		return {
			idx,
			position: [
				Math.cos(angle) * radius,
				Math.sin(angle) * radius,
				z
			],
			color
		};
	});
}
var pointsInner = createRing(18, 3.4, .2, [
	"#7c3aed",
	"#a78bfa",
	"#38bdf8"
]);
var pointsOuter = createRing(26, 5.8, -.12, [
	"#38bdf8",
	"#22d3ee",
	"#22c55e"
]);
var Point = ({ position, color }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sphere, {
	position,
	args: [
		.1,
		10,
		10
	],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		emissive: color,
		emissiveIntensity: .5,
		roughness: .5,
		color
	})
});
var PointCircle = () => {
	const ref = (0, import_react.useRef)(null);
	useFrame(({ clock }) => {
		if (ref.current?.rotation) ref.current.rotation.z = clock.getElapsedTime() * .05;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [pointsInner.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Point, {
			position: point.position,
			color: point.color
		}, point.idx)), pointsOuter.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Point, {
			position: point.position,
			color: point.color
		}, point.idx))]
	});
};
var ParticleRing = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "fixed inset-0 -z-20",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		camera: { position: [
			10,
			-7.5,
			-5
		] },
		className: "h-full w-full bg-slate-900",
		style: { height: "100vh" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				maxDistance: 20,
				minDistance: 10
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					-30,
					0,
					-30
				],
				power: 10
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointCircle, {})
		]
	})
});
var NICHES = [
	"Video",
	"Tech",
	"Fashion / Lifestyle",
	"Photography",
	"Business / Founders",
	"Other"
];
function DotLogo({ className = "h-14 w-14" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: logo2026_default,
			alt: "Dot Entertainments",
			className: `object-contain ${className}`
		})
	});
}
function FadeIn({ children, delay = 0, y = 24 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-80px"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		initial: {
			opacity: 0,
			y
		},
		animate: inView ? {
			opacity: 1,
			y: 0
		} : {},
		transition: {
			duration: .9,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children
	});
}
function Index() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		handle: "",
		niche: NICHES[0]
	});
	async function submitRegistration(e) {
		e.preventDefault();
		if (!form.name.trim() || !form.handle.trim() || !email.trim()) return;
		setLoading(true);
		try {
			const { data, error } = await supabase.from("registrations").insert([{
				full_name: form.name.trim(),
				email: email.trim(),
				social_handle: form.handle.trim(),
				niche: form.niche
			}]);
			if (error) throw error;
			setSubmitted(true);
		} catch (error) {
			console.error("Error submitting registration:", error.message);
			alert(`Oops! Something went wrong: ${error.message || "Please try again."}`);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleRing, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none fixed inset-0 -z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-[18%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_var(--color-aura-1),_transparent_60%)] blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[20%] top-[60%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-aura-2),_transparent_60%)] blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[10%] top-[80%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-aura-1),_transparent_60%)] blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grain opacity-[0.4]" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 sm:py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" }), "Belagavi, KA"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-12 pb-32 text-center sm:pt-20 sm:pb-40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
						delay: 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: summit_logo_default,
								alt: "Dot Creator Summit",
								className: "h-20 sm:h-28 w-auto object-contain mix-blend-multiply brightness-0",
								style: { filter: "brightness(0)" }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3.5 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-accent" }), "Creator Summit · 2026"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
						delay: .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] tracking-tight text-balance",
							children: ["You're ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "italic text-transparent bg-clip-text bg-gradient-to-br from-[oklch(0.2_0.05_285)] via-[oklch(0.55_0.22_285)] to-[oklch(0.7_0.18_285)]",
								children: "Invited."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
						delay: .15,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base",
							children: "Connect with leading creators and visionary founders, discover new opportunities, and build relationships that drive innovation."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
						delay: .25,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Connect" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-6 bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collaborate" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-6 bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grow" })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
						delay: .35,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-14 w-full max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,_var(--color-aura-1),_transparent_70%)] blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative glass rounded-3xl p-7 sm:p-8",
								children: !submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-1.5 w-1.5 rounded-full bg-accent animate-blink" }), "Soon · Date to be Announced"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-3xl leading-tight sm:text-4xl text-foreground",
										children: "Join the Waitlist"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "Register your interest to secure your creator pass."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: submitRegistration,
										className: "mt-6 space-y-4 text-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Full name",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													disabled: loading,
													value: form.name,
													onChange: (e) => setForm({
														...form,
														name: e.target.value
													}),
													className: "input disabled:opacity-50",
													placeholder: "Your name"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Invitation email address",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "email",
													required: true,
													disabled: loading,
													value: email,
													onChange: (e) => setEmail(e.target.value),
													className: "input disabled:opacity-50",
													placeholder: "you@example.com"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Instagram / YouTube Link or Handle",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													disabled: loading,
													value: form.handle,
													onChange: (e) => setForm({
														...form,
														handle: e.target.value
													}),
													className: "input disabled:opacity-50",
													placeholder: "https://instagram.com/yourhandle"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Primary niche",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
													disabled: loading,
													value: form.niche,
													onChange: (e) => setForm({
														...form,
														niche: e.target.value
													}),
													className: "input appearance-none cursor-pointer disabled:opacity-50",
													children: NICHES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: n,
														className: "bg-card text-foreground",
														children: n
													}, n))
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
												type: "submit",
												disabled: loading,
												whileHover: { scale: 1.02 },
												whileTap: { scale: .98 },
												className: "group relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:text-indigo-300 disabled:bg-foreground/60 mt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "relative z-10 flex items-center gap-2",
													children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Securing spot..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Register for Summit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
													initial: { y: "100%" },
													animate: { y: "-100%" },
													transition: {
														repeat: Infinity,
														repeatType: "mirror",
														duration: 1,
														ease: "linear"
													},
													className: "absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
												})]
											})
										]
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 12
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .5 },
									className: "py-6 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											initial: {
												scale: 0,
												rotate: -30
											},
											animate: {
												scale: 1,
												rotate: 0
											},
											transition: {
												delay: .1,
												type: "spring",
												stiffness: 200,
												damping: 14
											},
											className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.25_285)] to-[oklch(0.55_0.25_240)] shadow-[0_0_40px_oklch(0.6_0.28_285_/_0.5)]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												className: "h-7 w-7 text-white",
												strokeWidth: 3
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-6 font-display text-3xl leading-tight text-foreground",
											children: "You're on the list."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed text-muted-foreground",
											children: "Your registration interest is logged. Keep an eye on your inbox for your official digital entry pass once dates are finalized."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
											children: "— Connect • Collaborate • Grow"
										})
									]
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto w-full max-w-5xl px-6 py-24 sm:py-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground",
						children: "— The Venue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-5xl leading-[1] tracking-tight sm:text-7xl",
						children: [
							"A setting befitting",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"the gathering."
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
								delay: .1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right md:pr-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
											children: "Organized by"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center justify-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mr-3 text-[13px] font-medium tracking-[0.2em] uppercase",
												children: "Dot Entertainments"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white p-1 shadow-sm border border-border",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: logo2026_default,
													alt: "Dot Entertainments",
													className: "h-full w-full object-contain"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-4 text-sm text-muted-foreground leading-relaxed",
											children: [
												"Curating premium experiences",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												"for India's creator economy."
											]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-24 w-px bg-gradient-to-b from-transparent via-border to-transparent md:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "block h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:hidden" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
								delay: .2,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:pl-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
											children: "Powered by "
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white p-1 shadow-sm border border-border",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: pai_convention_default,
													alt: "Pai Convention Hall & Catering",
													className: "h-full w-full object-contain"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-medium tracking-[0.2em] uppercase",
												children: "Pai Convention Hall & Catering"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-4 text-sm text-muted-foreground leading-relaxed",
											children: [
												"Pai Convention Hall,",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												"Belagavi, Karnataka."
											]
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeIn, {
						delay: .3,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground",
								children: "— Location"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight tracking-tight",
								children: "Got confused about the location?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 rounded-xl overflow-hidden border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
									src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3811.0691469024825!2d74.48878!3d15.820583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf650041397155%3A0x4ef0da497e750a93!2sPai%20Convention%20Hall%20and%20Catering!5e0!3m2!1sen!2sin!4v1687123456789",
									width: "100%",
									height: "400",
									style: { border: "none" },
									allowFullScreen: true,
									loading: "lazy",
									referrerPolicy: "no-referrer-when-downgrade",
									title: "Pai Convention Hall Location"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative z-10 mx-auto w-full max-w-7xl px-6 py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.25em] text-muted-foreground",
						children: "© 2026 Dot Entertainments"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] uppercase tracking-[0.25em] text-muted-foreground",
						children: ["Developed by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://dotlab.framer.website/",
							target: "_blank",
							rel: "noreferrer",
							className: "underline hover:text-foreground",
							children: "dotlab.in"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--input);
          padding: 0.85rem 1rem;
          font-size: 0.875rem;
          color: var(--foreground);
          transition: all 0.2s;
        }
        .input::placeholder { color: var(--muted-foreground); opacity: 0.6; }
        .input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--ring); }
      ` })
		]
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { Index as component };
