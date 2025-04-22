"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-context"
import {
  ShieldCheck,
  Smartphone,
  Key,
  AlertTriangle,
  LogOut,
  Lock,
  Fingerprint,
  Mail,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SecuritySettingsPage() {
  const { user, updateUserSecurity, terminateSession, logout } = useAuth()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false)
  const [securityQuestionsEnabled, setSecurityQuestionsEnabled] = useState(user?.securityQuestions || false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleToggleTwoFactor = () => {
    const newValue = !twoFactorEnabled
    setTwoFactorEnabled(newValue)
    updateUserSecurity({ twoFactorEnabled: newValue })

    showSuccess(newValue ? "Two-factor authentication has been enabled" : "Two-factor authentication has been disabled")
  }

  const handleToggleSecurityQuestions = () => {
    const newValue = !securityQuestionsEnabled
    setSecurityQuestionsEnabled(newValue)
    updateUserSecurity({ securityQuestions: newValue })

    showSuccess(newValue ? "Security questions have been enabled" : "Security questions have been disabled")
  }

  const handleTerminateSession = (sessionId: string) => {
    terminateSession(sessionId)
    showSuccess("Session has been terminated")
  }

  const handleLogoutAllDevices = () => {
    logout(true)
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-muted-foreground">Manage your account security settings and active sessions</p>
        </div>

        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <Separator />

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Account Protection</span>
              </CardTitle>
              <CardDescription>Configure additional security measures to protect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <Label htmlFor="two-factor" className="text-base">
                      Two-factor authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Require a verification code when logging in from an unknown device
                    </p>
                  </div>
                </div>
                <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={handleToggleTwoFactor} />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-start gap-3">
                  <Key className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <Label htmlFor="security-questions" className="text-base">
                      Security questions
                    </Label>
                    <p className="text-sm text-muted-foreground">Set up security questions for account recovery</p>
                  </div>
                </div>
                <Switch
                  id="security-questions"
                  checked={securityQuestionsEnabled}
                  onCheckedChange={handleToggleSecurityQuestions}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <Label htmlFor="login-alerts" className="text-base">
                      Login alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for new login attempts</p>
                  </div>
                </div>
                <Switch id="login-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fingerprint className="h-5 w-5" />
                <span>Password & Authentication</span>
              </CardTitle>
              <CardDescription>Manage your password and authentication methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Change password</h3>
                  <p className="text-sm text-muted-foreground">Last changed: 30 days ago</p>
                </div>
                <Button variant="outline">Update password</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Recovery email</h3>
                  <p className="text-sm text-muted-foreground">Used for account recovery and security alerts</p>
                </div>
                <Button variant="outline">Update email</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>Active Sessions</span>
              </CardTitle>
              <CardDescription>Manage devices where you're currently logged in</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user?.activeSessions?.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.device}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{session.lastActive}</TableCell>
                      <TableCell className="text-right">
                        {session.device === "Current Browser" ? (
                          <span className="text-sm text-muted-foreground">Current session</span>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleTerminateSession(session.id)}
                          >
                            Terminate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full" onClick={handleLogoutAllDevices}>
                <LogOut className="h-4 w-4 mr-2" />
                Log out from all devices
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Security Audit</span>
              </CardTitle>
              <CardDescription>Review your account security and find potential issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md text-sm">
                <h3 className="font-medium mb-1">Security recommendations</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Enable two-factor authentication for stronger security</li>
                  <li>Review your recent login activity for any suspicious behavior</li>
                  <li>Update your password if you haven't changed it in the last 90 days</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button variant="outline">Run security check</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
