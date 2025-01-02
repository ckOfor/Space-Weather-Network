;; Alert System Contract

(define-map alerts
  { alert-id: uint }
  {
    event-type: (string-ascii 50),
    severity: uint,
    timestamp: uint,
    description: (string-utf8 500),
    status: (string-ascii 20)
  }
)

(define-map subscriptions
  { subscriber: principal }
  { min-severity: uint }
)

(define-data-var alert-count uint u0)

(define-public (create-alert (event-type (string-ascii 50)) (severity uint) (description (string-utf8 500)))
  (let
    (
      (new-alert-id (+ (var-get alert-count) u1))
    )
    (map-set alerts
      { alert-id: new-alert-id }
      {
        event-type: event-type,
        severity: severity,
        timestamp: block-height,
        description: description,
        status: "active"
      }
    )
    (var-set alert-count new-alert-id)
    (ok new-alert-id)
  )
)

(define-public (update-alert-status (alert-id uint) (new-status (string-ascii 20)))
  (let
    (
      (alert (unwrap! (map-get? alerts { alert-id: alert-id }) (err u404)))
    )
    (ok (map-set alerts
      { alert-id: alert-id }
      (merge alert { status: new-status })
    ))
  )
)

(define-public (subscribe (min-severity uint))
  (ok (map-set subscriptions
    { subscriber: tx-sender }
    { min-severity: min-severity }
  ))
)

(define-public (unsubscribe)
  (ok (map-delete subscriptions { subscriber: tx-sender }))
)

(define-read-only (get-alert (alert-id uint))
  (ok (map-get? alerts { alert-id: alert-id }))
)

(define-read-only (get-subscription (subscriber principal))
  (ok (map-get? subscriptions { subscriber: subscriber }))
)

(define-read-only (get-alert-count)
  (ok (var-get alert-count))
)

